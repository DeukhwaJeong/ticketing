import { TicketCreatedEvent, Subjects, Publisher } from "@deukhwatickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    
}
