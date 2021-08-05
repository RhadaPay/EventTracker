import request from 'supertest';
import App from '@/app';
import { PostWeiDto } from '@/dtos/ethereum.dto';
import EthereumRoute from '@/routes/ethereum.route';

const TIMEOUT = 10_000;

describe('Testing Eth routes', () => {
  jest.setTimeout(TIMEOUT);
  const ethereumRoute = new EthereumRoute();
  let app: App;
  beforeEach(() => {
    app = new App([ethereumRoute])
  })

  describe('[GET] /eth/status', () => {
    it('response statusCode 200 / checkStatus', () => {
      return request(app.getServer()).get(`${ethereumRoute.path}/status`)
        .expect(200);
    });
  });

  describe('[POST] /eth/send', () => {
    it('Sends one wei in a post request', async () => {
      const data: PostWeiDto = {
        value: 1,
      };
      return request(app.getServer()).post(`${ethereumRoute.path}/send`).send(data).expect(200);
    });

    it('response statusCode 400 for bad value (non-number)', async () => {
      const data = {
        value: "1",
      };
      return request(app.getServer()).post(`${ethereumRoute.path}/send`).send(data).expect(400);
    });
  
    it('response statusCode 400 for bad value (negative)', async () => {
      const data: PostWeiDto = {
        value: -1,
      };
      return request(app.getServer()).post(`${ethereumRoute.path}/send`).send(data).expect(400);
    });
    
    
    afterAll(async () => {
      await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
    });
  });
});
