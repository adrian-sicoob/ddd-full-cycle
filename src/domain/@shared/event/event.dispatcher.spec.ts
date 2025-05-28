import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";
import SendConsoleLog1WhenCustomerIsCreatedHandler from "../../customer/event/handler/send-console-log1-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "../../customer/event/handler/send-console-log2-when-customer-is-created.handler";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendConsoleLogWhenCustomerIsUpdatedHandler from "../../customer/event/handler/send-console-log-when-customer-is-updated.handler";
import CustomerUpdatedEvent from "../../customer/event/customer-updated.event";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  })

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("It should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      eventData: {
        name: "Product 1",
        description: "Product 1 description",
        price: 10.0,
      }
    })

    eventDispatcher.notify(productCreatedEvent)
    
    expect(spyEventHandler).toHaveBeenCalled();
  })

  describe("Test CustomerCreatedEvents", () => {
    it("Should register two event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLog1WhenCustomerIsCreatedHandler();
      const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
    })

    it("should unregister two event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLog1WhenCustomerIsCreatedHandler();
      const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
  
      eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);
      eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);
  
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
    })

    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLog1WhenCustomerIsCreatedHandler();
      const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();
  
      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
  
      eventDispatcher.unregisterAll();
  
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    });

    it("It should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLog1WhenCustomerIsCreatedHandler();
      const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

      const spyEventHandler = jest.spyOn(eventHandler, "handle");
      const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
  
      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
  
      const customerCreatedEvent = new CustomerCreatedEvent({
        eventData: {
          name: "Customer 1",
          email: "customer1@example.com",
        }
      })
  
      eventDispatcher.notify(customerCreatedEvent)
      
      expect(spyEventHandler).toHaveBeenCalled();
      expect(spyEventHandler2).toHaveBeenCalled();
    })
  })

  describe("Test CustomerUpdatedEvents", () => {
    it("Should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLogWhenCustomerIsUpdatedHandler();

      eventDispatcher.register("CustomerUpdatedEvent", eventHandler);

      expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(1);
      expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"][0]).toMatchObject(eventHandler);
    })

    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLogWhenCustomerIsUpdatedHandler();

      eventDispatcher.register("CustomerUpdatedEvent", eventHandler);

      eventDispatcher.unregister("CustomerUpdatedEvent", eventHandler);

      expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(0);
    })

    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLogWhenCustomerIsUpdatedHandler();

      eventDispatcher.register("CustomerUpdatedEvent", eventHandler);

      eventDispatcher.unregisterAll();

      expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toBeUndefined();

    })

    it("It should notify all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLogWhenCustomerIsUpdatedHandler();

      const spyEventHandler = jest.spyOn(eventHandler, "handle");

      const customer = new Customer("1", "Customer 1");
      const address = new Address("Street 1", 1, "1234567890", "City 1");
      customer.changeAddress(address);
      eventDispatcher.register("CustomerUpdatedEvent", eventHandler);

      const customerUpdatedEvent = new CustomerUpdatedEvent(customer);
      eventDispatcher.notify(customerUpdatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    })
  })
  
})