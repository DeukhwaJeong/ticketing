import { Publisher, ExpirationCompleteEvent, Subjects } from "@deukhwatickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}