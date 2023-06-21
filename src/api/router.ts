import express, { Router } from 'express';
import { indexController } from './controllers/index.controller';

const router: Router = express.Router();

router.get("/", indexController.get);

export default router;