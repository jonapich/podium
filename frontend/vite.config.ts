import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The API server binds 127.0.0.1 (see server/src/index.ts). Proxy to that address rather than
// "localhost", which can resolve to ::1 first and fail. PORT matches the server's PORT.
const apiTarget = `http://127.0.0.1:${process.env.PORT ?? "4317"}`;

export default defineConfig({
  plugins: [react()],
  build: {
    // Never inline a font as a data: URL: the CSP's font-src is 'self' only, so an inlined font is refused.
    assetsInlineLimit: (file) => (/\.woff2?$/.test(file) ? false : undefined),
  },
  server: {
    proxy: {
      // Server-Sent Events: http-proxy streams the response as it arrives. The server sends
      // `Cache-Control: no-cache` and no compression, so nothing in between buffers it.
      "/api": { target: apiTarget, changeOrigin: false },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
});
