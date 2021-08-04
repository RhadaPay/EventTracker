import { Event, NamedEvent } from '@/interfaces/events.interface';

export const eventModel: Event[] = [
  { id: 1, event: NamedEvent.AppDownload, createdOn: new Date().toDateString() }  
]
