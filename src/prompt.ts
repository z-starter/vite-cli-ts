/**
 * Interactive prompt module using Inquirer
 *
 * Handles user input prompts for CLI values
 * @module
 */

import inquirer, { Question } from "inquirer"
import { Cli } from "./cli.js"

/**
 * Extended CLI interface with required value
 */
export interface CliPrompt extends Cli {
  /** The input value to transform (required) */
  value: string
}

/**
 * Prompts user for input value if not provided via CLI
 *
 * @param cli - The CLI configuration object
 * @returns Promise resolving to complete CLI prompt configuration
 * @throws {Error} On unexpected prompt errors
 * @example
 * ```typescript
 * const prompted = await cliPrompt({ transform: "upper", value: undefined })
 * console.log(prompted.value) // User input or default
 * ```
 */
export const cliPrompt = async (cli: Cli): Promise<CliPrompt> => {
  const prompt1: Question[] = []

  if (!cli.value) {
    prompt1.push({
      type: "input",
      name: "value",
      message: "input value:",
      default: "Hello World!",
    })
  }

  try {
    const answers1 = await inquirer.prompt(prompt1)
    answers1.value ??= cli.value
    return { ...cli, ...answers1 } as CliPrompt
  } catch (error: any) {
    if (error.name === "ExitPromptError") {
      console.log("\nProcess interrupted. Exiting gracefully.")
      process.exit(0)
    } else {
      throw error
    }
  }
}
