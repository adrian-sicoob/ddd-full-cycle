import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

describe("Customer repository tests", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequileze.addModels([CustomerModel]);
    await sequileze.sync();
  })



  afterEach(async () => {
    sequileze.close();
  })

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "12345");
    customer.Address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({where: {id: "1"}});

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
      active: false,
      rewardPoints: 0,
      street: "Street 1",
      number: 1,
      city: "City 1",
      zip: "12345",
    })
  })
})