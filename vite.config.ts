import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables from the root directory
  const env = loadEnv(mode, process.cwd(), '');

  return {
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
            const finalPath = newPath.replace('DATABASE_ID_PLACEHOLDER', env.NOTION_DATABASE_ID || "");
            return finalPath.replace(/^\//, ''); // Remove leading slash to avoid double slashes
          },
          headers: {
            'Authorization': `Bearer ${env.NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28'
          }
        },
        "/api/groq": {
          target: "https://api.groq.com/openai/v1",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/groq/, "").replace(/^\//, ''),
          headers: {
            'Authorization': `Bearer ${env.GROQ_API_KEY}`
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
  };
});
