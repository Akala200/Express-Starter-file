/* eslint-disable import/named */
import { Router } from 'express';
import PingController from '../controllers/PinController';

const router = Router();

const {
  pingHeroku
} = PingController;

router.post('/ping', pingHeroku);

export default router;
