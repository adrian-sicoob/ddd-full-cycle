import CustomerFactory from "../../customer/factory/customer.factory";
import OrderItem from "../entity/order_items";
import OrderFactory from "./order.factory";
import { v4 as uuidv4 } from 'uuid';

describe("Order factory unit tests", () => {
  it("should create an order", () => {
    const orderProps = {
      id: uuidv4(),
      customerId: uuidv4(),
      items: [
        {
          id: uuidv4(),
          name: "Item 1",
          price: 100,
          productId: "1",
          quantity: 1
        },
        {
          id: uuidv4(),
          name: "Item 2",
          price: 200,
          productId: "2",
          quantity: 2
        }
      ]
    }
    const order = OrderFactory.create(orderProps);

    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items.length).toBe(2);
    expect(order.items[0].id).toBe(orderProps.items[0].id);
    expect(order.items[0].name).toBe(orderProps.items[0].name);
    expect(order.items[0].price).toBe(orderProps.items[0].price);
    expect(order.items[0].productId).toBe(orderProps.items[0].productId);
    expect(order.items[0].quantity).toBe(orderProps.items[0].quantity);
  });
});