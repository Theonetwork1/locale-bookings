// Paste your vite.config.ts code here
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  server: { port: 8080 },
  plugins: [react()],
});
