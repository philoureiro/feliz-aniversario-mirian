import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base relativo: funciona no GitHub Pages com qualquer nome de repositório
export default defineConfig({
  plugins: [react()],
  base: "./",
});
