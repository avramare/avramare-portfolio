# Banner Responsiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the `banner()` command so it renders without horizontal overflow on mobile screens, and confirm no TypeScript errors exist post-upgrade.

**Architecture:** `banner()` in `src/utils/bin/commands.ts` returns an HTML string injected via `dangerouslySetInnerHTML`. We branch on `window.innerWidth < 768` at call time (safe — banner only runs in `useEffect`, always client-side). Mobile gets a column layout with 120px image and short "MA" initials ASCII (~19 chars). Desktop keeps the current layout unchanged.

**Tech Stack:** Next.js 14, TypeScript 5.4, Playwright (E2E tests), Tailwind CSS

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/utils/bin/commands.ts` | Modify `banner()` | Add mobile/desktop branch |
| `tests/bannerResponsive.spec.ts` | Create | E2E tests for mobile + desktop banner layout |

---

### Task 1: Install dependencies

The worktree has no `node_modules`. All subsequent steps depend on this.

**Files:**
- None created/modified — installs into `node_modules/`

- [ ] **Step 1: Install deps**

```bash
npm install
```

Expected: `added N packages` with no errors.

- [ ] **Step 2: Verify TypeScript check passes**

```bash
npx tsc --noEmit 2>&1
```

Expected: zero output (no errors). If errors appear that are not "Cannot find module" (which means `npm install` didn't complete), fix them before proceeding. Common real errors after upgrade:
- Missing return types on exported functions → add `: string` / `: Promise<string>`
- `React` namespace not found in `.ts` files → add `import React from 'react'`

- [ ] **Step 3: Commit if any type errors were fixed**

Only commit if you changed source files to fix type errors. If `tsc` was clean, skip this step.

```bash
git add src/
git commit -m "fix: resolve TypeScript errors after Next.js 14 upgrade"
```

---

### Task 2: Write failing E2E test for mobile banner

We write the test first (TDD). It will fail because the current banner overflows on mobile.

**Files:**
- Create: `tests/bannerResponsive.spec.ts`

- [ ] **Step 1: Create the test file**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Banner responsiveness', () => {
  test('mobile: banner fits viewport with no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:3000');

    // Banner container must be visible
    await expect(page.locator('#banner')).toBeVisible({ timeout: 10000 });

    // Image must be visible (stacked above ASCII on mobile)
    await expect(page.getByRole('img')).toBeVisible({ timeout: 5000 });

    // Page must have no horizontal scrollbar
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });

  test('desktop: banner shows full ASCII art with no overflow', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000');

    await expect(page.locator('#banner')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('img')).toBeVisible({ timeout: 5000 });

    // Full "MARKO AVRAMARE" ASCII must be present on desktop
    // The string below is unique to the full 6-letter-wide desktop art
    await expect(page.getByText('██████╗ ██╗  ██╗ ██████╗', { exact: false }))
      .toBeVisible({ timeout: 5000 });

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });
});
```

- [ ] **Step 2: Start the dev server** (separate terminal, keep running)

```bash
npm run dev
```

Expected: `ready - started server on 0.0.0.0:3000`

- [ ] **Step 3: Run only the new tests to verify they fail**

```bash
npx playwright test tests/bannerResponsive.spec.ts --reporter=line
```

Expected: mobile test FAILS (`hasHorizontalOverflow` is `true`). Desktop test may pass or fail depending on viewport.

---

### Task 3: Implement responsive banner

**Files:**
- Modify: `src/utils/bin/commands.ts` — `banner()` function (lines 203–228)

- [ ] **Step 1: Replace the `banner()` function**

Replace the entire `banner` export (from `export const banner` through the closing backtick and semicolon) with:

```typescript
export const banner = (args?: string[]): string => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const bannerTop = isMobile
    ? `<div id="banner" style="display: flex; flex-direction: column; align-items: center; gap: 0.75em;">
<img src=${HeadshotImg.src} width="120px" />
███╗   ███╗ █████╗ 
████╗ ████║██╔══██╗
██╔████╔██║███████║
██║╚██╔╝██║██╔══██║
██║ ╚═╝ ██║██║  ██║
╚═╝     ╚═╝╚═╝  ╚═╝
</div>`
    : `<div id="banner" style="display: inline-flex; align-items: center;">
<img style="margin-right: 2em;" src=${HeadshotImg.src} width="180px" />  
███╗   ███╗ █████╗ ██████╗ ██╗  ██╗ ██████╗      █████╗ ██╗   ██╗██████╗  █████╗ ███╗   ███╗
████╗ ████║██╔══██╗██╔══██╗██║ ██╔╝██╔═══██╗    ██╔══██╗██║   ██║██╔══██╗██╔══██╗████╗ ████║
██╔████╔██║███████║██████╔╝█████╔╝ ██║   ██║    ███████║██║   ██║██████╔╝███████║██╔████╔██║
██║╚██╔╝██║██╔══██║██╔══██╗██╔═██╗ ██║   ██║    ██╔══██║╚██╗ ██╔╝██╔══██╗██╔══██║██║╚██╔╝██║
██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██╗╚██████╔╝    ██║  ██║ ╚████╔╝ ██║  ██║██║  ██║██║ ╚═╝ ██║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝     ╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝
</div>`;

  return `
${bannerTop}

<div style="margin-top: 1em; font-size: 1.2em; align-items: center; display: inline-flex;">
I live at the crossroads of user experience and system failure. Often stress the backend, poke the UI and automate the chaos so your users never have to experience it.
</div>

<div style="font-size: 0.9em;">
Hey, there! If you want to know more about me, just type 'about'

$ sumfetch - summary of who I am and what I do
$ resume -  download my resume
$ help - list of available commands
</div>
`;
};
```

> **Note:** The ASCII art lines in the template literals must start at column 0 (no indentation) or the monospace alignment breaks.

- [ ] **Step 2: Run the new tests to verify they pass**

```bash
npx playwright test tests/bannerResponsive.spec.ts --reporter=line
```

Expected: both tests PASS.

- [ ] **Step 3: Run the full existing test suite to check for regressions**

```bash
npx playwright test --reporter=line
```

Expected: all tests pass. If `homepageCommands.spec.ts` fails on the `bannerImg` or `homepageBanner` assertions, the `#banner` id and img are still present in both branches — no regression expected. If a test fails, read the error and check whether the banner HTML structure changed unexpectedly.

- [ ] **Step 4: Commit**

```bash
git add src/utils/bin/commands.ts tests/bannerResponsive.spec.ts
git commit -m "feat: responsive banner — stack image above MA ASCII on mobile, keep full layout on desktop"
```

---

## Success Criteria Checklist

- [ ] `tsc --noEmit` exits with zero errors
- [ ] At 375px viewport: `#banner` visible, image visible, `document.scrollWidth <= document.clientWidth`
- [ ] At 1280px viewport: full "MARKO AVRAMARE" ASCII present, no overflow
- [ ] All existing Playwright tests still pass
- [ ] Single file changed for the banner fix (`commands.ts`)
