;(global as any).WebSocket = require('isomorphic-ws');
process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import EventsRoute from '@routes/event.route';
import EthereumRoute from './routes/ethereum.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new EventsRoute(),
  new EthereumRoute()  
]);

app.listen();
