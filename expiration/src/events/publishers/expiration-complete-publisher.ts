import { Subjects, Publisher, ExpirationCompleteEvent } from "@hg1406/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}