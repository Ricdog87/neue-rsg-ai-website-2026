/**
 * Phone helpers — normalize user input to E.164 and run a sanity check.
 * Optimiert für DE/AT/CH-Eingaben; akzeptiert international über `+`.
 */

const COUNTRY_DEFAULT = '49'; // Germany

export function normalizePhone(raw: string): string | null {
  if (!raw) return null;
  // Strip spaces, parens, dashes, slashes, non-breaking spaces.
  let s = raw.replace(/[\s\-()/ ]/g, '');
  if (!s) return null;

  // International prefix "00" → "+"
  if (s.startsWith('00')) s = '+' + s.slice(2);
  // German national prefix "0" → "+49"
  else if (s.startsWith('0')) s = '+' + COUNTRY_DEFAULT + s.slice(1);
  // Already E.164
  else if (s.startsWith('+')) {
    // pass
  } else if (/^\d+$/.test(s)) {
    // Pure digits without prefix — treat as German local
    s = '+' + COUNTRY_DEFAULT + s;
  } else {
    return null;
  }

  // Validate: + followed by 8–15 digits (ITU-T E.164).
  if (!/^\+\d{8,15}$/.test(s)) return null;
  return s;
}

/** Format E.164 for display: "+49 30 826 87804". Best-effort, never throws. */
export function formatPhoneDisplay(e164: string): string {
  if (!e164.startsWith('+')) return e164;
  const digits = e164.slice(1);
  if (digits.length <= 3) return e164;
  // Split country + chunked rest. Keep simple — best-effort visual grouping.
  const country = digits.slice(0, 2);
  const rest = digits.slice(2);
  const grouped = rest.replace(/(\d{2,4})(?=\d)/g, '$1 ').trim();
  return `+${country} ${grouped}`;
}
