import Address from "./address";
import Customer from "./customer"

describe("Customer unit tests", () => {
    it("Should throw error when id is empty", () => {
      expect(() => {
        let customer = new Customer("", "John")
      }).toThrow("Id is required")
    });

    it("Should throw error when name is empty", () => {
      expect(() => {
        let customer = new Customer("123", "")
      }).toThrow("Name is required")
    });

    it("Should change name", () => {
      // Arrange
      let customer = new Customer("123", "John");

      //Act
      customer.changeName("Jane")

      //Assert
    expect(customer.name).toBe("Jane")
  })

    it("Should activate", () => {
      const customer = new Customer("1", "Customer 1")

      const address = new Address("Street 1", 123, "88061000", "Florianópolis")

      customer.Address = address;

      customer.activate()

      expect(customer.isActive()).toBe(true)
    });

    it("Should deactivate", () => {
      const customer = new Customer("1", "Customer 1")

      customer.deactivate()

      expect(customer.isActive()).toBe(false)
    });

    it("Should throw error when address is undefined when you activate a customer", () => {
      expect(() => {
        const customer = new Customer("1", "Customer 1")
        customer.activate()

      }).toThrow("Address is required");
    })

    it("Should add reward points", () => {
      const customer = new Customer("1", "Customer 1")
      expect(customer.rewardPoints).toBe(0)
      customer.addRewardPoints(10)
      expect(customer.rewardPoints).toBe(10)
      customer.addRewardPoints(20)
      expect(customer.rewardPoints).toBe(30)
    })

})