import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_items";

let customer = new Customer("123", "Wesley Willians")

const address = new Address("Rua dois", 2, "88061000", "Floripa")

customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 1);
const item2 = new OrderItem("2", "Item 2", 15, "p2", 2);
const order = new Order("1", customer.id, [item1, item2]);