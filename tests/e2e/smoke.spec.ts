import { test, expect } from '@playwright/test';

test.describe('Smoke — Hero & CTA', () => {
  test('Hero rendert mit kinetischer Headline', async ({ page }) => {
    await page.goto('/');
    // Eyebrow
    await expect(page.getByText('Deutschlands erste KI-Builder aus dem Vertrieb')).toBeVisible();
    // Headline (mindestens ein Fragment)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Vertriebsalltag');
    // Subline
    await expect(page.getByText(/15 Jahre B2B-Vertrieb/)).toBeVisible();
  });

  test('Primary-CTA verlinkt auf HubSpot Meetings', async ({ page }) => {
    await page.goto('/');
    const ctaLink = page
      .getByRole('link', { name: /Agenten-Demo anfragen/i })
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
