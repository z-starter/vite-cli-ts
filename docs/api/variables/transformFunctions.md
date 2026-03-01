[**vite-cli-ts API**](../README.md)

***

# Variable: transformFunctions

> `const` **transformFunctions**: `Record`\<`string`, (`value`) => `string`\>

Defined in: index.ts:21

Available transformation functions

## Example

```typescript
transformFunctions.upper("hello") // "HELLO"
transformFunctions.slugify("Hello World") // "hello-world"
```
