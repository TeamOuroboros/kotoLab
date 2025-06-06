import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "子育て支援アプリ",
        short_name: "kotolab",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#bcd4c1",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // ✅ ここが追加部分
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [
          /^\/api\//, // API全般（サーバー処理はReactに吸わせない）
          /^\/auth\//, // 認証系（Google callback含む）
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
});
