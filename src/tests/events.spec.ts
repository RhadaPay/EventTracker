import request from 'supertest';
import App from '@/app';
import { CreateEventDto } from '@dtos/events.dto';
import EventsRoute from '@routes/event.route';
import { delay } from '@/utils/util';


afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 0));
});

describe('Testing Events', () => {
  jest.setTimeout(10_000);

  const eventsRoute = new EventsRoute();
  let app: App;

  beforeAll(async () => {
    // Need to give the app time to connect to DB, would ideally like
    // to do this properly but can't work out
    app = new App([eventsRoute])
    await delay(5_000);
  })

  describe('[GET] /events', () => {
    it('response statusCode 200 / findAll', () => {
      return request(app.getServer())
        .get(`${eventsRoute.path}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('message', `findAll`)
        });
    });

    it('response statusCode 200 / findAllByStream', () => {
      const eventStreamId = 0;
      return request(app.getServer())
        .get(`${eventsRoute.path}?eventStreamId=${eventStreamId}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('message', `findAll for eventStreamId ${eventStreamId}`)
        });
    });
  });

  describe('[POST] /events', () => {
    it('response statusCode 201 / created', async () => {
      const eventData: CreateEventDto = { eventStreamId: 1 };
      return request(app.getServer())
        .post(`${eventsRoute.path}`)
        .send(eventData).expect(201);
    });

    it('response statusCode 400 for str', async () => {
      const eventData = {
        eventStreamId: "1",
      };
      return request(app.getServer())
        .post(`${eventsRoute.path}`)
        .send(eventData).expect(400);
    });

    it('response statusCode 400 for <0', async () => {
      const eventData: CreateEventDto = {
        eventStreamId: -1,
      };
      return request(app.getServer())
        .post(`${eventsRoute.path}`)
        .send(eventData).expect(400);
    });    
  });
});
