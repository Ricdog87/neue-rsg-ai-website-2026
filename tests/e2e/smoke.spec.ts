import { test, expect } from '@playwright/test';

test.describe('Smoke — Hero & CTA', () => {
  test('Hero rendert mit kinetischer Headline', async ({ page }) => {
    await page.goto('/');
    // Eyebrow
    await expect(page.getByText(/KI-Werkstatt für den Vertrieb/i)).toBeVisible();
    // Headline (mindestens ein Fragment)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('KI-Agenten');
    // Subline
    await expect(page.getByText(/Live in vier Wochen/i)).toBeVisible();
  });

  test('Primary-CTA verlinkt auf Terminbuchung', async ({ page }) => {
    await page.goto('/');
    const ctaLink = page
      .getByRole('link', { name: /Erstgespräch/i })
      .first();
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute('href', /\/termin/);
  });

  test('Alle Sektionen sind rendered (Anchor-IDs vorhanden)', async ({ page }) => {
    await page.goto('/');
    for (const id of [
      'hero',
      'voice-demo',
      'voice',
      'usp',
      'pipelines',
      'solutions',
      'roi',
      'pricing',
      'faq',
      'newsletter',
      'contact'
    ]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test('Footer enthält Impressum-Link', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Impressum' })).toBeVisible();
  });
});
