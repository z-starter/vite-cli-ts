import { describe, it, expect } from "vitest"
import { transformFunctions } from "./index.js"

describe("vite-cli-ts", () => {
  describe("transformFunctions", () => {
    describe("upper", () => {
      it("should convert text to uppercase", () => {
        expect(transformFunctions.upper("hello world")).toBe("HELLO WORLD")
      })

      it("should handle empty string", () => {
        expect(transformFunctions.upper("")).toBe("")
      })
    })

    describe("lower", () => {
      it("should convert text to lowercase", () => {
        expect(transformFunctions.lower("HELLO WORLD")).toBe("hello world")
      })
    })

    describe("reverse", () => {
      it("should reverse the string", () => {
        expect(transformFunctions.reverse("hello")).toBe("olleh")
      })

      it("should handle spaces", () => {
        expect(transformFunctions.reverse("hi there")).toBe("ereht ih")
      })
    })

    describe("slugify", () => {
      it("should convert to slug format", () => {
        expect(transformFunctions.slugify("Hello World")).toBe("hello-world")
      })

      it("should remove special characters", () => {
        expect(transformFunctions.slugify("Hello! World?")).toBe("hello-world")
      })

      it("should handle multiple spaces", () => {
        expect(transformFunctions.slugify("Hello   World")).toBe("hello-world")
      })
    })

    describe("capitalize", () => {
      it("should capitalize each word", () => {
        expect(transformFunctions.capitalize("hello world")).toBe("Hello World")
      })

      it("should handle single word", () => {
        expect(transformFunctions.capitalize("hello")).toBe("Hello")
      })
    })
  })

  describe("edge cases", () => {
    it("should handle unicode characters", () => {
      expect(transformFunctions.upper("café")).toBe("CAFÉ")
    })

    it("should handle very long strings", () => {
      const longString = "a".repeat(10000)
      expect(transformFunctions.upper(longString)).toBe(
        longString.toUpperCase(),
      )
    })

    it("should handle null-like values gracefully", () => {
      expect(() => transformFunctions.slugify("")).not.toThrow()
    })
  })
})
