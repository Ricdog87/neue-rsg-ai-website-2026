// lib/google-reviews.ts
// Live Google reviews via the Google Places API (Place Details).
// Server-only. Returns null when not configured, so the UI hides itself
// rather than ever showing fake reviews.
//
// Required env (set in Vercel):
//   GOOGLE_PLACES_API_KEY  — Maps Platform key with "Places API (New)" enabled
//   GOOGLE_PLACE_ID        — the Place ID of the business
//
// The data is revalidated hourly, so newly posted reviews appear
// automatically. Note: the Places API returns up to ~5 of the most
// relevant/recent reviews — that is a Google API limitation, not ours.

export type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  original?: string;
  photo?: string;
  profileUrl?: string;
  publishedAt: number;
};

export type GoogleReviewsData = {
  rating: number;
  total: number;
  reviews: GoogleReview[];
};

type PlacesV1Response = {
  rating?: number;
  userRatingCount?: number;
  reviews?: Array<{
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    relativePublishTimeDescription?: string;
    publishTime?: string;
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }>;
};

/**
 * Fetch live Google reviews. Cached + revalidated hourly so new reviews
 * surface automatically. Returns null if unconfigured or on any error.
 */
export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=de`,
      {
        headers: {
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
        },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as PlacesV1Response;

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? 'Google-Nutzer',
        rating: r.rating ?? 0,
        text: (r.text?.text ?? r.originalText?.text ?? '').trim(),
        // text is now German (languageCode=de -> Google auto-translates);
        // original kept so the UI can offer "Original anzeigen" on click.
        original: ((o) => (o && o !== (r.text?.text ?? '').trim() ? o : undefined))((r.originalText?.text ?? '').trim()),
        relativeTime: r.relativePublishTimeDescription ?? '',
        photo: r.authorAttribution?.photoUri,
        profileUrl: r.authorAttribution?.uri,
        publishedAt: r.publishTime ? Date.parse(r.publishTime) : 0,
      }))
      // Testimonials = positive, real reviews only; newest first.
      .filter((r) => r.rating >= 4 && r.text.length > 0)
      .sort((a, b) => b.publishedAt - a.publishedAt);

    if (reviews.length === 0) return null;

    return {
      rating: data.rating ?? 0,
      total: data.userRatingCount ?? reviews.length,
      reviews,
    };
  } catch {
    return null;
  }
}
