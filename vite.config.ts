import { defineConfig } from "vite"
import { swc } from "@o.z/vite-plugin-swc"
import path from "path"
import versionPlugin from "./plugin/vite-plugin-version.ts"

export default defineConfig({
  build: {
    target: "node18",
    ssr: true,
    lib: {
      name: "vite-cli-ts",
      entry: [path.resolve(import.meta.dirname, "./src/index.ts")],
      fileName: (format, name) => {
        if (format === "es") return `${name}.js`
        else return `${name}.${format}`
      },
      formats: ["es"],
    },
  },
  plugins: [versionPlugin(), swc()],
  ssr: {
    noExternal: true,
  },
})
