import { Publisher, OrderCreatedEvent, Subjects } from '@deukhwatickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}