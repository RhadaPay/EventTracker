import { Event } from "@/interfaces/events.interface";
import { DBRequest } from "@/interfaces/request.interface";
import { contract } from "@/plugins/ethereum";
import { queue } from "@/plugins/queue";
import { EthereumService } from "@/services/ethereum.service";
import { EventService } from "@/services/event.service";
import { NextFunction, Request, Response } from "express";

class EventsController {
  public eventService = new EventService();
  public ethService = new EthereumService(contract);

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
      const { db, body } = req;
      const data = await this.eventService.createEvent(db, body);
      await queue.add(this.ethService.ingestEvent(db, body));
      res.status(201).json({ data, message: 'created' });
    } catch (error){
      next(error)
    }
  }
}

export default EventsController
