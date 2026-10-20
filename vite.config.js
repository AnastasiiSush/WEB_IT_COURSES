import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { resolve } from "path";

export default defineConfig({
  server: { port: 5173, open: true },
  preview: { port: 4173 },
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        courses: resolve(__dirname, "src/courses.html"),
        details: resolve(__dirname, "src/details.html"),
        enrollment: resolve(__dirname, "src/enrollment.html"),
      },
    },
  },
  plugins: [
    ViteEjsPlugin({
      courses: [
        {
          title: "Python & Machine Learning",
          level: "Beginner",
          duration: "4 Months",
          description: "Master Python, NumPy, Pandas, Scikit-learn, and build 3 commercial-grade portfolio projects with mentor guidance.",
          tags: ["Python", "AI"],
          price: "$100 / mo",
          link: "details.html"
        },
        {
          title: "Frontend Web Developer",
          level: "Intermediate",
          duration: "3 Months",
          description: "Learn HTML5, CSS3, JavaScript ES6+, and React to build responsive modern web applications.",
          tags: ["Web", "React"],
          price: "$90 / mo",
          link: "details.html"
        },
        {
          title: "Game Developer in Unity",
          level: "Beginner",
          duration: "4 Months",
          description: "Build 2D and 3D commercial games using C# and Unity Engine from scratch.",
          tags: ["GameDev", "C#"],
          price: "$110 / mo",
          link: "details.html"
        }
      ]
    })
  ]
});