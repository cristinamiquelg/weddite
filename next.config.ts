import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 defaults to allowing only quality 75; the hero parallax
    // screenshots need a higher quality (fine text/lines compress badly
    // at 75), so 90 is explicitly allow-listed alongside the default.
    qualities: [75, 90],
  },
};

export default nextConfig;
