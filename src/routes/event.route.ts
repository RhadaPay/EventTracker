import EventsController from "@/controllers/events.controller";
import { CreateEventDto } from "@/dtos/events.dto";
import { Routes } from "@/interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import { Router } from "express";

class EventsRoute implements Routes {
  public path = '/events';
  public router = Router();
  public eventsController = new EventsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.eventsController.getEvents);
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateEventDto, 'body'),
      this.eventsController.postEvent
    );
  }  
}

export default EventsRoute;