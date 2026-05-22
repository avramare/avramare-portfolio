# Banner Responsiveness & TypeScript Audit — Design Spec

Date: 2026-05-22

## Problem

Two distinct issues:

1. **Banner overflow on mobile.** `banner()` in `src/utils/bin/commands.ts` returns an HTML string with a 180px headshot image and a ~88-char-wide block-letter ASCII art ("MARKO AVRAMARE") laid out side-by-side in `inline-flex`. On screens narrower than ~700px this overflows and the ASCII art wraps incorrectly. The `whitespace-pre-wrap` class on the History output `<p>` preserves the line breaks of the ASCII art, so wrapping corrupts the art entirely.

2. **Possible import/type errors from Next.js upgrade.** The project was recently upgraded from an older Next.js to 14.2 + TypeScript 5.4. Several import issues were patched in PRs (AppProps, InputProps, inputRef optional chaining, next-env.d.ts regeneration). Remaining issues are unknown until the compiler is asked.

## Scope

- `src/utils/bin/commands.ts` — `banner()` function (section 1)
- TypeScript compilation check, fix only actual errors (section 2)
- No changes to `History.tsx`, `hook.ts`, `interface.ts`, `index.tsx`, or `_app.tsx` for the banner fix

## Design

### 1. Responsive Banner

**Approach**: viewport-width check at call time.

`banner()` is only ever called from `useEffect` in `index.tsx` (line 25) — always client-side, `window` is always defined. Safe to read `window.innerWidth` without guards beyond a `typeof window !== 'undefined'` check (kept for SSR safety).

**Breakpoint**: `window.innerWidth < 768` → mobile path. `>= 768` → desktop path (unchanged).

**Mobile layout**:
- Container: `display: flex; flex-direction: column; align-items: center; gap: 0.75em`
- Image: 120px width, centered (was 180px side-by-side)
- ASCII art: "MA" initials only, ~20 chars wide — fits any mobile screen at `text-xs` (~12px monospace)
- Tagline and help divs below: unchanged

**Desktop layout**: identical to current HTML string, zero changes.

**"MA" initials ASCII** (box-drawing characters matching existing banner style, ~20 visual chars wide):
```
███╗   ███╗ █████╗ 
████╗ ████║██╔══██╗
██╔████╔██║███████║
██║╚██╔╝██║██╔══██║
██║ ╚═╝ ██║██║  ██║
╚═╝     ╚═╝╚═╝  ╚═╝
```

**Why not CSS-only**: CSS media queries can change layout but cannot swap ASCII art content. Two separate HTML branches are simpler and have no runtime cost.

**Why not React component refactor**: requires changing `setHistory` signature, `History.tsx` rendering model, `interface.ts`, and `hook.ts` — large blast radius for a layout fix.

### 2. TypeScript Audit

Run `npx tsc --noEmit` (or `pnpm tsc --noEmit`). Fix only errors the compiler surfaces. No speculative changes.

Known low-risk areas likely already working:
- `commands.ts` PNG import (`HeadshotImg from '../../assets/headshot.png'`) — covered by `next/image-types/global` via `next-env.d.ts`
- `_document.tsx` class component — valid Pages Router pattern in Next 14
- `src/utils/bin/api_commands.ts` imports — standard utility imports, no Next-specific APIs

If `tsc` outputs zero errors, no changes needed.

## Files Changed

| File | Change |
|------|--------|
| `src/utils/bin/commands.ts` | Add mobile branch to `banner()` |
| Possibly others | Only if `tsc` surfaces real errors |

## Success Criteria

- On a 375px viewport, banner shows image above "MA" ASCII art with no horizontal overflow
- On a 768px+ viewport, banner is identical to current
- `tsc --noEmit` exits with zero errors
- No changes to files outside scope
