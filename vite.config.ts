import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import manifest from "./manifest.json";

export default defineConfig({
  server: {
    allowedHosts: ["f347-157-100-134-46.ngrok-free.app"],
  },
  plugins: [
    VitePWA({
      manifest: { ...manifest, display: "standalone" },
      includeAssets: ["finnhub-logo.webp", "finnhub-logo (1).webp"],
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
      },
    }),
  ],
});
