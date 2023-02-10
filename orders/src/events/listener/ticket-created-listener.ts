import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@deukhwatickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;

    //What is a queue group?
    //When we have multiple instances of the same service running, we want to make sure that
    //each instance of the service gets a copy of the event. We do this by creating a queue
    //group. Each instance of the service will join the queue group and each event will be
    //sent to one of the instances in the queue group. This is called load balancing.
    queueGroupName = queueGroupName;
    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        const { id, title, price } = data;
        const ticket = Ticket.build({
            id,
            title,
            price
        });
        await ticket.save();

        msg.ack();
    }
}