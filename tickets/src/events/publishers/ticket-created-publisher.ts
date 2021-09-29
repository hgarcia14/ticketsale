import { Publisher, Subjects, TicketCreatedEvent } from "@hg1406/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}