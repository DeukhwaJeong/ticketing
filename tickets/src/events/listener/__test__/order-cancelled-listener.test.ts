import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { Ticket } from "../../../models/ticket";
import mongoose from "mongoose";
import { OrderCancelledEvent } from "@deukhwatickets/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new OrderCancelledListener(natsWrapper.client);
    const orderId = new mongoose.Types.ObjectId().toHexString()
    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: 'fesf',
    })
    ticket.set({ orderId });
    await ticket.save();

    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id,
        }
    }

    const msg: Partial<Message> = {
        ack: jest.fn()
    };

    return { listener, data, msg, ticket };
}


it('updates the ticket, publishes an event, and acks the message', async () => {
    const { listener, data, msg, ticket } = await setup();

    await listener.onMessage(data, msg as Message);

    const updatedTicket = await Ticket.findById(data.ticket.id);

    expect(updatedTicket!.orderId).not.toBeDefined();

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    expect(msg.ack).toHaveBeenCalled();
})
