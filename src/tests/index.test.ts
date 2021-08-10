import request from 'supertest';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import { delay } from '@/utils/util';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  jest.setTimeout(10_000);

  let app: App;  
  const indexRoute = new IndexRoute();
  
  beforeAll(async() => {
    app = new App([indexRoute]);
    await delay(5_000);
  })

  it('response statusCode 200', () => {
    return request(app.getServer()).get(`${indexRoute.path}`).expect(200);
  });
});
