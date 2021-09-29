import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { Ticket } from "../../../models/ticket";
import { TicketUpdateEvent } from '@hg1406/common';

const setup = async () => {
  // Create a listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  
  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Movie',
    price: 10
  });
  await ticket.save();

  // Create a fake data object
  const data: TicketUpdateEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'New movie',
    price: 20,
    userId: 'dcdsvs'
  };
  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  // return all of this stuff
  return { msg, data, ticket, listener };
};

it('Finds, updates, an saves a ticket', async () => {
  const { msg, data, ticket, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedticket = await Ticket.findById(ticket.id);

  expect(updatedticket!.title).toEqual(data.title);
  expect(updatedticket!.price).toEqual(data.price);
  expect(updatedticket!.version).toEqual(data.version);
});

it('Acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('Does not call ack if the event has a skipped version number', async () => {
  const { msg, data, listener, ticket } = await setup();

  data.version = 10;

  try {
    await listener.onMessage(data, msg);
  } catch (error) {
    
  }

  expect(msg.ack).not.toHaveBeenCalled();
});