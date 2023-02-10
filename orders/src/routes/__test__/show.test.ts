import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";
it('returns 200', async () => {
    
    // 1. Create a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    })

    // 2. Save the ticket to the database
    await ticket.save();

    // 3. Create a users;
    const userOne = global.signin();
    const userTwo = global.signin();

    // 4. Create one order as User #1
    const {body : order} = await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ ticketId: ticket.id })

    // 5. Make a request to fetch the order
    await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', userOne)
        .send()
        .expect(200);

    await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', userTwo)
        .send()
        .expect(401);    
    
    
});