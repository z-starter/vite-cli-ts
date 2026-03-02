[**vite-cli-ts API**](../README.md)

***

# Variable: transformFunctions

> `const` **transformFunctions**: `Record`\<`string`, (`value`) => `string`\>

Defined in: [index.ts:21](https://github.com/z-starter/vite-cli-ts/blob/bc5a7140684f92b2dd8dba045dfec60130a9a3ce/src/index.ts#L21)

Available transformation functions

## Example

```typescript
transformFunctions.upper("hello") // "HELLO"
transformFunctions.slugify("Hello World") // "hello-world"
```
