/**
 * CLI argument parsing module
 *
 * Handles command-line argument parsing using yargs
 * @module
 */

import yargs, { Arguments } from "yargs"
import { hideBin } from "yargs/helpers"

/**
 * List of available transformation types
 */
const transformList = [
  "upper",
  "reverse",
  "slugify",
  "lower",
  "capitalize",
] as const

/**
 * Type representing available transform operations
 */
export type TransformType = (typeof transformList)[number]

/**
 * CLI arguments interface
 */
export interface Cli {
  /** The transformation type to apply */
  transform: TransformType
  /** The value to transform (optional) */
  value: string | undefined
}

/**
 * Parses command-line arguments and returns CLI configuration
 *
 * @returns Promise resolving to CLI configuration object
 * @throws {Error} If transform type is required but not provided
 * @example
 * ```typescript
 * const cli = await getCli()
 * console.log(cli.transform) // "upper"
 * ```
 */
export const getCli = async (): Promise<Cli> => {
  const version = import.meta.env.VITE_APP_VERSION ?? "0.0.0"
  const yargsInstance = yargs(hideBin(process.argv))
    .scriptName("vite-cli-ts")
    .usage("Usage: $0 <transform> [value]")
    .epilogue(
      "📦 A lightweight tool that performs various text transformations.\n" +
        "Pipe text into it or pass it as arguments.",
    )
    .example("$0 upper 'hello world'", "HELLO WORLD")
    .example("$0 reverse 'hello'", "olleh")
    .example("$0 slugify 'Hello World'", "hello-world")
    .example("$0 lower 'HELLO'", "hello")
    .example("$0 capitalize 'hello world'", "Hello World")
    .option("help", {
      alias: "h",
      type: "boolean",
      describe: "Show help information",
    })
    .option("version", {
      alias: "v",
      type: "boolean",
      describe: "Show version number",
    })
    .check((argv: Arguments) => {
      if (!argv._[0]) {
        throw new Error("Transform is required")
      }
      return true
    })
    .help("help", "Show this help message")
    .alias("help", "h")
    .version(version)
    .alias("v", "version")
    .demandCommand(1, "Provide a transform type")
    .strict()

  const argv = await yargsInstance.parseAsync()
  const transform = argv._[0] as string
  const value = argv._[1] as string | undefined

  if (!transformList.includes(transform as TransformType)) {
    console.error(
      `❌ Error: Transform "${transform}" was not found.\n` +
        `Available transforms:\n` +
        transformList.map((t) => `• ${t}`).join("\n") +
        `\nPlease select one of the transforms above.`,
    )
    process.exit(2)
  }

  return { transform: transform as TransformType, value }
}
