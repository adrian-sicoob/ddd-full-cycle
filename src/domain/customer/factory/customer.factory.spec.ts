import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Adrian Fadiga");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Adrian Fadiga");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Street 1", 1, "City 1", "12345");
    const customer = CustomerFactory.createWithAddress("Customer 1", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBeDefined();
    expect(customer.address).toBe(address);
  });
});