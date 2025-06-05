import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      zip: entity.address.zip,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      id: entity.id,
      name: entity.name,
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      zip: entity.address.zip,
    }, {
      where: {
        id: entity.id,
      }
    });
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({where: {id}, rejectOnEmpty: true});
    } catch(error) {
      throw new Error("Customer not found");
    }
    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zip);
    customer.changeAddress(address);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    
    const customers = customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zip);
      customer.changeAddress(address);
      if (customerModel.active) {
        customer.activate();
      }
      customer.addRewardPoints(customerModel.rewardPoints);
      return customer;
    });

    return customers;
  }
}