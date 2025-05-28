import { Sequelize } from "sequelize-typescript";
import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order_items";
import OrderRepository from "./order.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/customer/entity/customer";
import Address from "../../domain/customer/value-object/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/product/entity/product";

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

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "12345");
    customer.changeAddress(address);
    await customerRepository.create(customer);
    const customer2 = new Customer("c2", "Customer 2");
    const address2 = new Address("Street 2", 2, "City 2", "12345");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product = new Product("p1", "Product 1", 10);
    const product2 = new Product("p2", "Product 2", 20);
    await productRepository.createMany([product, product2]);

    const orderItem = new OrderItem("i1", product.name, product.price, product.id, 2);
    const orderItem2 = new OrderItem("i2", product.name, product.price, product.id, 2);
    const orderItem3 = new OrderItem("i3", product.name, product.price, product.id, 2);
    const orderItem4 = new OrderItem("i4", product.name, product.price, product.id, 2);

    const orderRepository = new OrderRepository();
    const order = new Order("o1", customer.id, [orderItem, orderItem2]);
    await orderRepository.create(order);
    const order2 = new Order("o2", customer2.id, [orderItem3, orderItem4]);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();

    const orders = [order, order2];

    expect(orders).toEqual(foundOrders);

    const orderModels = await OrderModel.findAll({include: ["orderItems"]});
    expect(orderModels[0].toJSON()).toStrictEqual({
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      orderItems: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          productId: orderItem.productId,
          quantity: orderItem.quantity,
          orderId: order.id
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          productId: orderItem2.productId,
          quantity: orderItem2.quantity,
          orderId: order.id
        }
      ]
    });

    expect(orderModels[1].toJSON()).toStrictEqual({
      id: order2.id,
      customerId: order2.customerId,
      total: order2.total(),
      orderItems: [
        {
          id: orderItem3.id,
          name: orderItem3.name,
          price: orderItem3.price,
          productId: orderItem3.productId,
          quantity: orderItem3.quantity,
          orderId: order2.id
        },
        {
          id: orderItem4.id,
          name: orderItem4.name,
          price: orderItem4.price,
          productId: orderItem4.productId,
          quantity: orderItem4.quantity,
          orderId: order2.id
        }
      ]
    });
  })
})