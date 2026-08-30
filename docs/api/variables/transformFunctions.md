[**vite-cli-ts API**](../README.md)

***

# Variable: transformFunctions

> `const` **transformFunctions**: `Record`\<`string`, (`value`) => `string`\>

Defined in: [index.ts:21](https://github.com/z-starter/vite-cli-ts/blob/91b2c4ccd5856639f35590e27381d5287a137d8a/src/index.ts#L21)

Available transformation functions

## Example

```typescript
transformFunctions.upper("hello") // "HELLO"
transformFunctions.slugify("Hello World") // "hello-world"
```
