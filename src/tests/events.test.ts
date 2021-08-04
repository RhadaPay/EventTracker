import request from 'supertest';
import App from '@/app';
import { CreateEventDto } from '@dtos/events.dto';
import { NamedEvent } from '@interfaces/events.interface';
import { eventModel } from '@models/events.model';
import EventsRoute from '@routes/event.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Events', () => {
  const eventsRoute = new EventsRoute();
  let app: App;
  beforeEach(() => {
    app = new App([eventsRoute])
  })

  describe('[GET] /events', () => {
    it('response statusCode 200 / findAll', () => {
      return request(app.getServer()).get(`${eventsRoute.path}`).expect(200, { data: eventModel, message: 'findAll' });
    });
  });

  describe('[POST] /events', () => {
    it('response statusCode 201 / created', async () => {
      const eventData: CreateEventDto = {
        event: NamedEvent.PriceChange,
      };
      return request(app.getServer()).post(`${eventsRoute.path}`).send(eventData).expect(201);
    });

    it('response statusCode 400 for bad enum', async () => {
      const eventData = {
        event: "not an enum value",
      };
      return request(app.getServer()).post(`${eventsRoute.path}`).send(eventData).expect(400);
    });
  });
});
