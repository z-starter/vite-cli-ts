/**
 * Vite plugin for injecting version information
 *
 * Injects package version into build and generates version.json asset
 * @module
 */

import { Plugin } from "vite"

/**
 * Creates a Vite plugin that injects version information
 *
 * @returns Vite plugin configuration
 * @example
 * ```typescript
 * // vite.config.ts
 * import versionPlugin from "./plugin/vite-plugin-version"
 * export default defineConfig({
 *   plugins: [versionPlugin()]
 * })
 * ```
 */
const versionPlugin = (): Plugin => {
  return {
    name: "inject-version",

    /**
     * Injects version into define config
     * @param config - Vite configuration object
     * @returns Modified Vite configuration
     */
    config(config) {
      config.define ??= {}
      config.define["import.meta.env.VITE_APP_VERSION"] = JSON.stringify(
        process.env.npm_package_version,
      )
      return config
    },

    /**
     * Generates version.json asset during build
     * @returns void
     */
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "version.json",
        source: JSON.stringify(
          { version: process.env.npm_package_version },
          null,
          2,
        ),
      })
    },
  }
}

export { versionPlugin }
export default versionPlugin
