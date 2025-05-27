import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerUpdatedEvent from "../customer-updated.event";

export default class SendConsoleLogWhenCustomerIsUpdatedHandler implements EventHandlerInterface<CustomerUpdatedEvent> {
  handle(event: CustomerUpdatedEvent): void {
    const { eventData: { id, name, Address } } = event;
    const { street, number, zip, city } = Address;
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${ street}, ${number}, ${zip}, ${city}`);
  }
}