import { Sequelize } from "sequelize-typescript";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_items";
import OrderRepository from "./order.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "12345");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("i1", product.name, product.price, product.id, 2);

    const orderRepository = new OrderRepository();
    const order = new Order("o1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["orderItems"]});

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      orderItems: [
        {id: orderItem.id, 
          name: orderItem.name, 
          price: orderItem.price, 
          productId: orderItem.productId, 
          quantity: orderItem.quantity, 
          orderId: order.id},
      ],
    })
  })

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "12345");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    const product2 = new Product("p2", "Product 2", 20);
    await productRepository.createMany([product, product2]);


    const orderItem1 = new OrderItem("i1", product.name, product.price, product.id, 2);
    const orderItem2 = new OrderItem("i2", product2.name, product2.price, product2.id, 1);

    const orderRepository = new OrderRepository();
    const order = new Order("o1", customer.id, [orderItem1]);

    await orderRepository.create(order);
    order.removeItem(orderItem1);
    order.addItem(orderItem2);
    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["orderItems"]});

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      orderItems: [
        {id: orderItem2.id, 
          name: orderItem2.name, 
          price: orderItem2.price, 
          productId: orderItem2.productId, 
          quantity: orderItem2.quantity, 
          orderId: order.id},
      ],
    })  
  })

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "12345");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    const product2 = new Product("p2", "Product 2", 20);
    await productRepository.createMany([product, product2]);

    const orderItem = new OrderItem("i1", product.name, product.price, product.id, 2);
    const orderItem2 = new OrderItem("i2", product.name, product.price, product.id, 2);

    const orderRepository = new OrderRepository();
    const order = new Order("o1", customer.id, [orderItem, orderItem2]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({where: {id: order.id}, include: ["orderItems"]});

    const foundOrder = await orderRepository.find(order.id);

    console.log(foundOrder)

    expect(orderModel.toJSON()).toStrictEqual({
      id: foundOrder.id,
      customerId: foundOrder.customerId,
      total: foundOrder.total(),
      orderItems: [
        {id: orderItem.id, 
          name: orderItem.name, 
          price: orderItem.price, 
          productId: orderItem.productId, 
          quantity: orderItem.quantity, 
          orderId: order.id},
        {id: orderItem2.id, 
          name: orderItem2.name, 
          price: orderItem2.price, 
          productId: orderItem2.productId, 
          quantity: orderItem2.quantity, 
          orderId: order.id},
      ],
    })
  })
})