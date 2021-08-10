import { CreateEventDto } from "@/dtos/events.dto";
import { Event } from "@/interfaces/events.interface";
import { Database } from "@/plugins/database";
import { emptyValidation } from "@/utils/util";

export class EventService {
  public async fetchAllEvents(db: Database): Promise<Event[]> {
    return await db.getAllEvents();
  }

  public async fetchEventsByStream(db: Database, streamId: number): Promise<Event[]> {
    return await db.getEventsByStream(streamId);
  }

  public async createEvent(db: Database, data: CreateEventDto): Promise<Event> {
    emptyValidation(data);
    const _id = await db.createNewEvent(data);
    return { ...data, _id }
  }
}