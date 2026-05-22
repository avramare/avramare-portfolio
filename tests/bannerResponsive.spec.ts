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

    // Banner element itself must not overflow the viewport width
    const bannerOverflowsViewport = await page.evaluate(() => {
      const banner = document.querySelector('#banner');
      if (!banner) return false;
      return banner.scrollWidth > window.innerWidth;
    });
    expect(bannerOverflowsViewport).toBe(false);
  });

  test('desktop: banner shows full ASCII art with no overflow', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000');

    await expect(page.locator('#banner')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('img')).toBeVisible({ timeout: 5000 });

    // Full "MARKO AVRAMARE" ASCII must be present on desktop
    // This string is unique to the full 6-letter-wide desktop art
    await expect(page.getByText('██████╗ ██╗  ██╗ ██████╗', { exact: false }))
      .toBeVisible({ timeout: 5000 });

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });
});
