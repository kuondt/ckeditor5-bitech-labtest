import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const isLib = mode === "lib";

  if (isLib) {
    return {
      plugins: [
        react(),
        dts({
          insertTypesEntry: true,
          copyDtsFiles: true,
        }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.tsx"),
          name: "CKEditor5BiTechLabTest",
          fileName: "index",
          formats: ["es", "cjs", "umd"],
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
        commonjsOptions: {
          include: [/node_modules/],
        },
      },
    };
  }

  return {
    server: {
      open: "index.html",
    },
    plugins: [react()],
  };
});
