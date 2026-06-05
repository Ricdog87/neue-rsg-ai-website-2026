import { test, expect } from '@playwright/test';

/**
 * Smoke tests for the current multi-page structure.
 * Assertions are viewport-robust (run on Desktop Chrome + Pixel 7):
 * anchors/links are checked with toBeAttached so they don't depend on
 * responsive visibility (e.g. nav links collapse into the mobile menu).
 */

test.describe('Homepage — hero & CTA', () => {
  test('Hero rendert mit Eyebrow, Headline und Subline', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/Werkstatt für den Vertrieb/i)).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('KI-Agenten');
    await expect(page.getByText(/Live in vier Wochen/i)).toBeVisible();
  });

  test('Primary-CTA verlinkt auf Terminbuchung', async ({ page }) => {
    await page.goto('/');
    const ctaLink = page.getByRole('link', { name: /Erstgespräch/i }).first();
    await expect(ctaLink).toBeAttached();
    await expect(ctaLink).toHaveAttribute('href', /\/termin/);
  });

  test('Kern-Sektionen der Homepage sind vorhanden', async ({ page }) => {
    await page.goto('/');
    for (const id of ['hero', 'pricing-snapshot', 'rechner', 'voice', 'trust', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test('Footer enthält Impressum-Link', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Impressum' }).first()).toBeAttached();
  });
});

test.describe('Automatisierung', () => {
  test('Seite rendert mit Hero und Kern-Sektionen', async ({ page }) => {
    await page.goto('/automatisierung');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Prozesse/i);
    await expect(page.locator('#ki-agent')).toBeAttached();
    await expect(page.locator('#automation-pricing')).toBeAttached();
  });
});

test.describe('English site', () => {
  test('/en rendert auf Englisch', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/AI agents/i);
  });
});
