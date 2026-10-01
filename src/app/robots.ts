import type { MetadataRoute } from "next";

// Pre-launch: keep every route out of crawlers, mirroring the noindex
// metadata in the root layout.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
