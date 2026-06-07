import { getGoogleReviews } from '@/lib/google-reviews';
import { ReviewsMarquee } from '@/components/sections/reviews-marquee';

/**
 * Live Google reviews section (server component). Fetches real reviews and
 * renders the futuristic marquee. Renders nothing when not configured —
 * we never show fake reviews. Add GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID
 * to switch it on; new reviews then appear automatically (hourly revalidate).
 */
export async function GoogleReviews({ en = false }: { en?: boolean }) {
  const data = await getGoogleReviews();
  if (!data) return null;
  return <ReviewsMarquee data={data} en={en} />;
}
