import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api/notion": {
        target: "https://api.notion.com/v1",
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api\/notion/, "");
          return newPath.replace('DATABASE_ID_PLACEHOLDER', process.env.NOTION_DATABASE_ID || "");
        },
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28'
        }
      },
      "/api/groq": {
        target: "https://api.groq.com/openai/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/groq/, ""),
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        }
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
