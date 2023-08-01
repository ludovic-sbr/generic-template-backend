import express from 'express';
import { Logger, LogType } from '../common/services/logger';
import * as swaggerUi from 'swagger-ui-express';
import * as core from 'express-serve-static-core';
import router from './router';
import { config } from '../common/config/main';
import { openapiSpecification } from '../common/config/swagger';
import cookieParser from 'cookie-parser';
import db from '../database';

export class APIBuilder {
  async build(): Promise<core.Express> {
    Logger.info(
      `Starting ${config.apiName} on port ${config.apiPort}. Production : ${String(config.prod)}`,
      LogType.API,
    );

    // DATABASE instanciation
    Logger.info('Connection to database ...', LogType.API);
    await db.initialize();

    // GENERAL API INSTANTIATION
    const app = express();

    app.listen(config.apiPort, () => Logger.info(`API is listening on port ${config.apiPort}.`, LogType.API));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(router);

    // SWAGGER LOADER ----------
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

    Logger.info('Swagger configuration set up.', LogType.API);

    Logger.info('Main API launch completed.', LogType.API);

    return app;
  }
}

export const apiBuilder = new APIBuilder();
