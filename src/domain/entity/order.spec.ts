import Order from "./order"
import OrderItem from "./order_items";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrow("Id is required")
  })

  it("should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrow("Customer Id is required")
  })

  it("should throw error when order array is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrow("Items are required")
  })

  it("should calculate total", () => {
    const item1 = new OrderItem("i1", "item 1", 100, "p1", 1)
    const item2 = new OrderItem("i2", "item 2", 200, "p2", 1)
    const order = new Order("o1", "c1", [item1, item2])

    const total = order.total()

    expect(total).toBe(300)
  })
})