import { EventService } from "@/services/event.service";
import { NextFunction, Request, Response } from "express";

class EventsController {
  public eventService = new EventService();

  public getEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.eventService.fetchAllEvents();
      res.status(200).json({ data, message: 'findAll' });
    } catch (error){
      next(error)
    }
  }

  public postEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.eventService.createEvent(req.body);
      res.status(201).json({ data, message: 'created' });
    } catch (error){
      next(error)
    }
  }
}

export default EventsController
