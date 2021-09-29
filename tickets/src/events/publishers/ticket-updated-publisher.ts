import { Publisher, Subjects, TicketUpdateEvent } from "@hg1406/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdateEvent> {
    readonly subject = Subjects.TicketUpdated;
}