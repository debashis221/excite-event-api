import EventsModel, { Events } from "../model/events.model";

export function createEvents(input: Partial<Events>) {
  return EventsModel.create(input);
}

export function findEventsById(id: string) {
  return EventsModel.findById(id);
}

export function findEvents() {
  return EventsModel.find();
}

export function updateEvents(id: string, input: Partial<Events>) {
  return EventsModel.findByIdAndUpdate(id, input, { new: true });
}

export function deleteEvents(id: string) {
  return EventsModel.findByIdAndDelete(id);
}