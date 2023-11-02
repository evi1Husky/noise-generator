import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        theme_color: "#171920",
        background_color: "#171920",
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "noise generator",
        description: "noise generator",
        name: "noise generator",
        icons: [
          {
            src: "/appicon.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
