import { CreateEventDto } from "@/dtos/events.dto";
import { Event } from "@/interfaces/events.interface";
import { eventModel } from "@/models/events.model";
import { emptyValidation } from "@/utils/util";

export class EventService {
  public events = eventModel;

  public async fetchAllEvents(): Promise<Event[]> {
    return this.events
  }

  public async createEvent(data: CreateEventDto): Promise<Event> {
    emptyValidation(data);
    const newEvent: Event = {
      eventId: this.events.length + 1,
      eventStreamId: data.eventStreamId
    };
    return newEvent
  }
}