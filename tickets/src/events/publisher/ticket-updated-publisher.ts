import { TicketUpdatedEvent, Subjects, Publisher } from "@deukhwatickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    
}
