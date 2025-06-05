import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_items";


let customer = new Customer("123", "Wesley Willians")

const address = new Address("Rua dois", 2, "88061000", "Floripa")

customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 1);
const item2 = new OrderItem("2", "Item 2", 15, "p2", 2);
const order = new Order("1", customer.id, [item1, item2]);