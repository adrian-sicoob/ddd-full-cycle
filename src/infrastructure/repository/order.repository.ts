import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_items";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";


export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customerId: entity.customerId,
      total: entity.total(),
      orderItems: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
      })),
    }, {
    include: [{model: OrderItemModel}]
    })
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.sequelize.transaction(async (t) => {
      await OrderModel.update(
        {
          customerId: entity.customerId,
          total: entity.total(),
        },
        {
          where: { id: entity.id },
          transaction: t,
        }
      );
      
      
      await OrderItemModel.destroy({ where: { orderId: entity.id }, transaction: t });
      
      
      const items = entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
        orderId: entity.id,
      }));

      
      await OrderItemModel.bulkCreate(items, { transaction: t });
    });
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({where: {id}, rejectOnEmpty: true});
    const items = new OrderItem("1", "Item 1", 100, "1", 1);
    return new Order(orderModel.id, orderModel.customerId, [items]);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();
    const items = new OrderItem("1", "Item 1", 100, "1", 1);
    const orders = orderModels.map((orderModel) => {
      return new Order(orderModel.id, orderModel.customerId, [items]);
    });
    return orders;
  }
}