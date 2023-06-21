import express from 'express';
import { Logger, LogType } from '../../common/services/logger';

export class IndexController {
    constructor() {}

    public async get(req: express.Request, res: express.Response) {
        Logger.info(`Route[${req.url}] requested.`, LogType.BUSINESS);

        res.status(200).json("Test of main controller");
    }
}

export const indexController: IndexController = new IndexController();