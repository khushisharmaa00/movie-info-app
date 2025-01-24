import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        movie: "movie.html", // Add movie.html as a second entry point
      },
    },
  },
});
