import Product from "./product";

describe("Product unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      let product = new Product("", "Product 1", 100)
    }).toThrow("Id is required");
  })


})