import Customer from "../entity/customer";
import { v4 as uuidv4 } from 'uuid';
import Address from "../value-object/address";

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(uuidv4(), name)
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuidv4(), name);
    customer.changeAddress(address);
    return customer;
  }
}