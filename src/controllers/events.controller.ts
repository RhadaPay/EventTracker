import { Event } from "@/interfaces/events.interface";
import { DBRequest } from "@/interfaces/request.interface";
import { EventService } from "@/services/event.service";
import { NextFunction, Request, Response } from "express";

class EventsController {
  public eventService = new EventService();

  public getEvents = async (req: DBRequest, res: Response, next: NextFunction) => {
    try {
      const { db } = req;
      const { eventStreamId } = req.query;
      console.log(eventStreamId)
      let message = 'findAll';
      let data: Event[];

      if (eventStreamId) {
        const nStreamId = Number(eventStreamId);
        message = message + ` for eventStreamId ${eventStreamId}`
        data = await this.eventService.fetchEventsByStream(db, nStreamId);
      } else {
        data = await this.eventService.fetchAllEvents(db);
      };

      res.status(200).json({ data, message });
    } catch (error){
      next(error)
    }
  }

  public postEvent = async (req: DBRequest, res: Response, next: NextFunction) => {
    try {
      const { db } = req;
      const data = await this.eventService.createEvent(db, req.body);
      res.status(201).json({ data, message: 'created' });
    } catch (error){
      next(error)
    }
  }
}

export default EventsController
