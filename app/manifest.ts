import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cozy Threads",
    short_name: "Cozy Threads",
    description: "Ethically-sourced apparel",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#22543d",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
