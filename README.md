# vite-cli-ts ⚡

A modern starter template for building **TypeScript command-line tools** with [Vite](https://vitejs.dev/).  
It provides a solid foundation for creating robust CLI applications with text transformation utilities, interactive prompts, version injection, and comprehensive testing – all bundled with Vite’s speed and flexibility.

## ✨ Features

- 🚀 **Zero‑config Vite setup** – Fast builds and hot‑reload during development.
- 🧩 **Modular architecture** – Separate modules for CLI parsing, prompting, and transformations.
- 🔄 **Five built‑in text transforms** – `upper`, `lower`, `reverse`, `slugify`, `capitalize`.
- 💬 **Interactive prompts** – Falls back to inquirer when no value is provided.
- 📦 **Vite plugin for version injection** – Injects `package.json` version into your build and emits `version.json`.
- ✅ **Testing with Vitest** – Includes unit tests and coverage configuration.
- 📚 **API documentation** – Auto‑generated via TypeDoc (Markdown output).
- 📦 **Ready for npm publishing** – GitHub Actions workflow included.
- 🔧 **TypeScript** – Full type safety and modern ES2022 features.

## 📋 Prerequisites

- [Node.js](https://nodejs.org) **18.0.0** or higher
- [Yarn](https://yarnpkg.com) (recommended) or npm

## 🛠 Installation

### As a project template (clone & start developing)

```bash
# Clone the repository
git clone https://github.com/z-starter/vite-cli-ts.git my-cli
cd my-cli

# Install dependencies
yarn install

# Build the project
yarn build

# Try it out
./bin.js upper "hello world"
```

Or click the **"Use this template"** button on GitHub to create a new repository based on this starter.

## 🖥 Usage

### Command Line

```bash
vite-cli-ts <transform> [value]
```

| Argument     | Description                                   |
| ------------ | --------------------------------------------- |
| `transform`  | One of: `upper`, `lower`, `reverse`, `slugify`, `capitalize` |
| `value`      | The text to transform (optional)              |

If `value` is omitted, you will be prompted interactively.

#### Examples

```bash
# Uppercase
vite-cli-ts upper "hello world"   # HELLO WORLD

# Reverse
vite-cli-ts reverse "hello"        # olleh

# Slugify
vite-cli-ts slugify "Hello World!" # hello-world

# Lowercase
vite-cli-ts lower "HELLO"          # hello

# Capitalize
vite-cli-ts capitalize "hello world" # Hello World
```

### Programmatic Usage

You can also use the transformation functions directly in your Node.js code:

```typescript
import { transformFunctions, change } from 'vite-cli-ts';

// Using the functions map
console.log(transformFunctions.upper('hello')); // "HELLO"
console.log(transformFunctions.slugify('TypeScript CLI')); // "typescript-cli"

// Using the change helper
const result = change({ transform: 'capitalize', value: 'vite cli' });
console.log(result); // "Vite Cli"
```

For full API documentation, see the [API Reference](./docs/api/README.md).

## 🔧 Available Transformations

| Transform    | Description                                     | Example                          |
| ------------ | ----------------------------------------------- | -------------------------------- |
| `upper`      | Converts the entire string to uppercase         | `"hello" → "HELLO"`              |
| `lower`      | Converts the entire string to lowercase         | `"HELLO" → "hello"`              |
| `reverse`    | Reverses the character order                    | `"hello" → "olleh"`              |
| `slugify`    | Creates a URL‑friendly slug                     | `"Hello World!" → "hello-world"` |
| `capitalize` | Capitalizes the first letter of each word       | `"hello world" → "Hello World"`  |

## 🧩 Vite Plugin: Version Injection

The included Vite plugin automatically injects your `package.json` version into the build:

- Adds `import.meta.env.VITE_APP_VERSION` (or `process.env.npm_package_version` in CommonJS)
- Generates a `version.json` asset in the output directory containing the version.

```typescript
// vite.config.ts
import versionPlugin from './plugin/vite-plugin-version';

export default {
  plugins: [versionPlugin()],
};
```

## 📦 Project Structure

```
vite-cli-ts/
├── .github/workflows/      # GitHub Actions (publish)
├── bin.js                  # CLI entry point
├── docs/api/               # Auto‑generated API docs
├── plugin/                 # Vite plugin for version injection
├── src/
│   ├── cli.ts              # CLI argument parsing (yargs)
│   ├── index.ts            # Main exports & boot logic
│   ├── prompt.ts           # Interactive prompts (inquirer)
│   ├── index.test.ts       # Unit tests (Vitest)
│   └── vite-env.d.ts       # Vite environment types
├── .prettierrc             # Prettier configuration
├── typedoc.json            # TypeDoc configuration
├── vite.config.ts          # Vite build configuration
├── package.json
├── tsconfig.json
└── LICENSE
```

## 🧪 Development

### Install dependencies

```bash
yarn install
```

### Build the project

```bash
yarn build
```

### Run in development mode (builds and executes)

```bash
yarn dev
```

### Run tests

```bash
yarn test              # Run tests once
yarn test:coverage      # Run with coverage report
```

### Generate API documentation

```bash
yarn docs              # Generate Markdown docs in docs/api/
yarn docs:watch        # Watch mode
```
