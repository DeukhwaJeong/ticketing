import { TicketCreatedEvent } from '@deukhwatickets/common';
import { TicketCreatedListener } from '../ticket-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
    // create an instance of the listener
    const listener = new TicketCreatedListener(natsWrapper.client);
    // create a fake data event
    const data: TicketCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        title: 'concert',
        price: 10,
        userId: new mongoose.Types.ObjectId().toHexString()
    }
    // create a fake message object

    const msg: Partial<Message> = {
        ack: jest.fn()
    }
    return { listener, data, msg };
};
it('creates and saves a ticket', async () => {
    const { listener, data, msg } = await setup();
    // call the onMessage function with the data object and message object
    await listener.onMessage(data, msg as Message);
    // write assertions to make sure a ticket was created
    const ticket = await Ticket.findById(data.id);

    expect(ticket).toBeDefined();
});

it('ack the message', async ()=> {
    const { listener, data, msg } = await setup();
    // call the onMessage function with the data object and message object
    await listener.onMessage(data, msg as Message);
    // write aasertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();
});