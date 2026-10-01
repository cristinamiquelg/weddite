// Vercel sets VERCEL_ENV per deployment: "production" for main, "preview" for
// staging and PR previews. Everything environment-specific keys on this, never
// on the branch or the code, so the same commit can be promoted from staging
// to production without carrying staging-only behaviour along.
export function isStagingEnv(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

// SHA-256 of the staging password (not the password itself, so it isn't
// sitting in plain text in the repo). Only used to gate non-production
// deployments; for stronger protection, move it to an env var.
export const STAGING_PASSWORD_SHA256 =
  "e9f6c19ca9f6f905b41dbffff70d51663b23e55b0e85c813e282574873a34154";
