import express from "express";
import { Logger, LogType } from '../common/services/logger';
require('dotenv').config();
import * as swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../../swagger.json');
import * as core from 'express-serve-static-core';

export class APIBuilder {
    build(): core.Express {
        Logger.info(`Starting ${process.env.API_NAME} on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`, LogType.API);

        // GENERAL API INSTANTIATION
        const app = express();
        const port: string = process.env.PORT!;
        
        app.listen(port, () => Logger.info(`API is listening on port ${process.env.PORT}.`, LogType.API));
        
        
        // SWAGGER LOADER ----------
        app.use('/api-docs', swaggerUi.serve);
        app.get('/api-docs', swaggerUi.setup(swaggerDocument));
        
        Logger.info("Swagger configuration set up.", LogType.API);
    
        Logger.info("Main API launch completed.", LogType.API);
    
        return app;
    }
}

export const apiBuilder = new APIBuilder();