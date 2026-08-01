# DESIGN.md — AVRAMARE Portfolio

Design system for the redesigned portfolio: a **Windows 95 desktop** running a
**live CRT terminal**. Documented from the built world.

## Concept

The interface *is* the machine. A single beveled Win95 window sits centered on a
teal desktop; inside runs the command shell (unchanged behavior). Chrome is an
authentic 3D-bevel UI kit; the console is a phosphor CRT. "Advanced styling" =
period-correct chrome elevated with CRT power-on, scanlines/flicker/glow, a live
status-bar clock, launcher icons, and reskinnable appearance + phosphor schemes.

Direction was **user-pinned** (Win95/98 beveled, single polished window), so the
concept-seed roll was intentionally skipped.

## Color — schemes (CSS variables)

Chrome palette is driven by `[data-scheme]` on `.win-desktop`; the console glow
by `[data-phosphor]`. Both persist to `localStorage` and switch from **View**.

- **Appearance:** `standard` (Windows Standard, silver+blue — default), `rainy`
  (Rainy Day, blue-gray), `desert` (tan+gold), `contrast` (High Contrast Black).
- **Phosphor:** `green` (default), `amber`, `ice`.

Core chrome tokens: `--surface`, `--surface-light/-lighter/-dark/-darker`,
`--face-text`, `--title-a/-b` (titlebar gradient), `--desktop-a/-b`, `--selection`.
Console tokens: `--term-bg`, `--term-fg`, `--term-dim`, `--term-user`,
`--term-host`, `--term-punct`, `--term-error`, `--term-glow`.

## Type

- **Chrome:** `MSSansSerif` (self-hosted `ms_sans_serif.woff2` + bold),
  `-webkit-font-smoothing: none` for crisp bitmap character. Titlebar 12px bold,
  menu/dropdown 12px, status bar 11px.
- **Console:** `Cascadia` / `Hack` monospace, 14px desktop / 12px mobile.
- **Brand:** AVRAMARE ANSI-Shadow ASCII wordmark (68 cols) + ruled tagline bar.

## The bevel system (core kit)

Reusable utility classes, the heart of the UI kit:

- `.bevel-out` / `.bevel-in` — 2px double bevel (raised / sunken) via 4 inset
  box-shadows (light top-left, dark bottom-right).
- `.bevel-out-thin` / `.bevel-in-thin` — 1px variants (buttons, status segments).
- Window drop shadow uses real offset + blur for depth.

## Components (`src/components/ui/`)

- **`Window.tsx`** — shell: titlebar (app icon + title + min/max/close pixel-SVG
  controls, active/inactive states via `data-inactive`), menu-bar slot, body,
  status-bar slot. `onMinimize` collapses to a restore pill.
- **`MenuBar.tsx`** — File / Edit / View / Help with beveled dropdowns, mnemonic
  underlines, checkable rows. View owns theme switching; other rows drive the
  terminal via the command bus.
- **`StatusBar.tsx`** — sunken segments: status text, command count, live clock.
- **`DesktopIcons.tsx`** — launcher icons (About, Résumé, Projects, GitHub,
  LinkedIn); double-click / Enter runs the mapped command; select state.
- **`icons.tsx`** — pixel SVG glyphs (`shapeRendering: crispEdges`): window
  controls, titlebar app icon, desktop icons.
- **`theme.tsx`** — `ThemeProvider` / `useTheme`, scheme + phosphor state.

## Motion

- `crt-on` — CRT power-on (scanline collapse + brightness flash) on window mount.
- `win-appear` — restore-from-minimize.
- `crt-flicker` (console vignette) + `caret-blink`; boot log types line-by-line.
- All gated by `prefers-reduced-motion`.

## Terminal integration

Shell logic, commands, history, tab-completion, and keybinds are **unchanged**.
`src/utils/terminalBus.ts` bridges desktop icons + menu → the shell. A boot
sequence precedes the AVRAMARE banner; the headshot image was removed in favor of
the ASCII brand.

## Notes / follow-ups

- Mobile layout intentionally left for the owner to refine (breakpoint at 767px:
  icons hidden, window fills, 12px console, text brand).
- Desktop dither overlay (`.win-desktop::before`) is kept by owner preference;
  the design detector flags it as advisory-only.
