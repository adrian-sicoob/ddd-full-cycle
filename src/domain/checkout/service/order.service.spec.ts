import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderService from "./order.service"
import OrderItem from "../entity/order_items"

describe("Order service unit tests", () => {
  it("Should get total of all orders", () => {
    const item1 = new OrderItem("i1", "Item 1", 100, "p1", 1)
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2)

    const order = new Order("o1", "c1", [item1])
    const order2 = new Order("o2", "c1", [item2])

    const total = OrderService.total([order, order2])

    expect(total).toBe(500)
  })

  it("should place an order", () => {
    const customer = new Customer("c1", "Customer 1")
    const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1)

    const order = OrderService.placeOrder(customer, [item1])

    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  })
})