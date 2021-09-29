import { Subjects, Publisher, PaymentCreatedEvent } from "@hg1406/common";

export class PaymentCreaterPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}