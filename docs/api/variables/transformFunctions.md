[**vite-cli-ts API**](../README.md)

***

# Variable: transformFunctions

> `const` **transformFunctions**: `Record`\<`string`, (`value`) => `string`\>

Defined in: [index.ts:21](https://github.com/z-starter/vite-cli-ts/blob/8cf729723584b15b5a081bd23fecebbad8185106/src/index.ts#L21)

Available transformation functions

## Example

```typescript
transformFunctions.upper("hello") // "HELLO"
transformFunctions.slugify("Hello World") // "hello-world"
```
