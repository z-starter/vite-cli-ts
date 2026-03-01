/**
 * Main entry point for vite-cli-ts
 *
 * Provides text transformation utilities and CLI bootstrapping.
 *
 * @packageDocumentation
 */

import { getCli } from "./cli.js"
import { cliPrompt, type CliPrompt } from "./prompt.js"

/**
 * Available transformation functions
 *
 * @example
 * ```typescript
 * transformFunctions.upper("hello") // "HELLO"
 * transformFunctions.slugify("Hello World") // "hello-world"
 * ```
 */
const transformFunctions: Record<string, (value: string) => string> = {
  /**
   * Converts text to uppercase
   * @param value - The input string to transform
   * @returns The uppercase transformed string
   */
  upper: (value) => value.toUpperCase(),

  /**
   * Converts text to lowercase
   * @param value - The input string to transform
   * @returns The lowercase transformed string
   */
  lower: (value) => value.toLowerCase(),

  /**
   * Reverses the string character by character
   * @param value - The input string to reverse
   * @returns The reversed string
   */
  reverse: (value) => value.split("").reverse().join(""),

  /**
   * Converts text to slug format (lowercase, hyphen-separated)
   * @param value - The input string to slugify
   * @returns The slugified string
   * @example
   * ```typescript
   * slugify("Hello World!") // "hello-world"
   * ```
   */
  slugify: (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-"),

  /**
   * Capitalizes the first letter of each word
   * @param value - The input string to capitalize
   * @returns The capitalized string
   * @example
   * ```typescript
   * capitalize("hello world") // "Hello World"
   * ```
   */
  capitalize: (value) =>
    value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
}

/**
 * Applies a transformation to the given value
 * @param params - The transformation parameters
 * @param params.transform - The transformation type to apply
 * @param params.value - The value to transform
 * @returns The transformed string
 * @throws {Error} If the transform type is unknown
 */
const change = ({ transform, value }: CliPrompt): string => {
  const transformer = transformFunctions[transform]
  if (!transformer) {
    throw new Error(`Unknown transform: ${transform}`)
  }
  return transformer(value)
}

/**
 * Initializes and runs the CLI application
 * @returns Promise that resolves when CLI completes
 * @example
 * ```typescript
 * await boot()
 * ```
 */
const boot = async (): Promise<void> => {
  try {
    const cli = await getCli()
    const prompted = await cliPrompt(cli)
    const result = change(prompted)
    console.log("✅ Result:", result)
    process.exit(0)
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred"
    console.error("❌ Error:", message)
    process.exit(1)
  }
}

export default boot
export { boot, change, transformFunctions }
