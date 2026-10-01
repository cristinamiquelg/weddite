// While false, the production deployment shows only the coming-soon page
// (see src/proxy.ts). Staging and previews are never affected. Flip to true
// (and promote through staging → main) to launch the real site.
export const LAUNCHED = false;

export function isComingSoon(): boolean {
  return !LAUNCHED && process.env.VERCEL_ENV === "production";
}
