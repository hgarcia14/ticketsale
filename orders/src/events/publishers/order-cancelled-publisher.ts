import { Publisher, OrderCancelledEvent, Subjects } from "@hg1406/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}