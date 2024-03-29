import { Subjects, PaymentCreatedEvent, Publisher } from "@deukhwatickets/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}