process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import dotenv from "dotenv";
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import ethereumMiddleware from '@/middlewares/ethereum.middleware';
import { logger, stream } from '@utils/logger';
import { contract } from './plugins/ethereum';
import { Database, connectDB } from '@/plugins/database';
import databaseMiddleware from './middlewares/database.middleware';

dotenv.config();

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public db: Database;
  private routes: Routes[];

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';
    this.routes = routes;
    this.initializeAppliction();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public initializeAppliction() {
    const self = this;
    connectDB().then(db => {
      self.initializeMiddlewares();
      self.attachContractToEthRoutes();
      self.initializeDbMiddleware(db);
      self.initializeRoutes(this.routes);
      self.initializeSwagger();
      self.initializeErrorHandling();
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeDbMiddleware(db: Database) {
    console.log('Connected at', db.thread.toString());
    this.app.use(databaseMiddleware(db))
  }

  private attachContractToEthRoutes() {
    /*
      Get the contract from the eth plugin and attach to the routes
    */

    this.app.use('/eth\/*', ethereumMiddleware(contract));
  }
}

export default App;
