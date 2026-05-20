# Next.js 14.2.x + TypeScript 5.4.x Upgrade

**Date:** 2026-05-20  
**Scope:** Upgrade Next.js (12.1.6 → 14.2.x) and TypeScript (4.6.4 → 5.4.x), fix resulting type gaps in components and pages.  
**Router:** Pages Router (no migration to App Router).

---

## Motivation

- Next.js 12.1.6 is from May 2022 — unsupported, missing security patches and performance improvements.
- TypeScript 4.6.4 is incompatible with the existing `tsconfig.json` which already uses TS 5-only options (`moduleResolution: "bundler"`, `ignoreDeprecations: "6.0"`). The project is effectively broken at the declared version.
- `next-env.d.ts` contains a stray Next.js 15 typed-routes import that does not belong.

---

## Package Version Changes

| Package | From | To |
|---|---|---|
| `next` | `12.1.6` | `14.2.x` |
| `react` | `18.1.0` | `18.3.x` |
| `react-dom` | `18.1.0` | `18.3.x` |
| `typescript` | `^4.6.4` | `^5.4.x` |
| `@types/node` | `17.0.32` | `^20.x` |
| `@types/react` | `18.0.9` | `^18.3.x` |
| `@types/react-dom` | `18.0.3` | `^18.3.x` |
| `eslint-config-next` | `^12.1.6` | `^14.2.x` |
| `eslint-plugin-next` | `^0.0.0` | **remove** (absorbed into `eslint-config-next`) |

React 18.3.x is the final React 18 release — no breaking changes from 18.1.0.

---

## Code Changes

### `src/pages/_app.tsx`

Add `AppProps` type to fix untyped `Component` and `pageProps`:

```tsx
import type { AppProps } from 'next/app';
const App = ({ Component, pageProps }: AppProps) => { ... }
```

### `src/components/input.tsx`

Add a typed props interface (currently all implicit `any`). Import `HistoryInterface` from the history module:

```tsx
import { History as HistoryInterface } from './history/interface';

interface InputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  command: string;
  history: Array<HistoryInterface>;
  lastCommandIndex: number;
  setCommand: React.Dispatch<React.SetStateAction<string>>;
  setHistory: (value: string) => void;
  setLastCommandIndex: React.Dispatch<React.SetStateAction<number>>;
  clearHistory: () => void;
}
```

### `next-env.d.ts`

Remove the stray Next.js 15 typed-routes import line. File will be auto-regenerated clean on the next `next build`.

### `tsconfig.json`

- Remove `"ignoreDeprecations": "6.0"` — was a TS 5.5 suppression option, not needed at 5.4.
- Bump `"target"` from `"es5"` to `"es2017"` — Next.js 14 drops IE11 support, `es2017` is the appropriate baseline.

---

## Testing Plan

1. `npm install` with updated versions
2. `tsc --noEmit` — verify zero type errors
3. `next build` — verify clean production build
4. `next dev` — manual smoke test: banner loads, commands respond (`about`, `help`, `sumfetch`, `morse`)
