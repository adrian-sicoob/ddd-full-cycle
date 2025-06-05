import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerUpdatedEvent from "../customer-updated.event";

export default class SendConsoleLogWhenCustomerIsUpdatedHandler implements EventHandlerInterface<CustomerUpdatedEvent> {
  handle(event: CustomerUpdatedEvent): void {
    const { eventData: { id, name, address } } = event;
    const { street, number, zip, city } = address;
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${ street}, ${number}, ${zip}, ${city}`);
  }
}