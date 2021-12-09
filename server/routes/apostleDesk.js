/* eslint-disable import/named */
import { Router } from 'express';
import ApostleDeskController from '../controllers/ApostleDeskController';


const router = Router();

const {
  getAllEvent,
  getAMessage,
  getAllMessage,
  getContent
} = ApostleDeskController;

router.get('/event/all', getAllEvent);
router.get('/sermon/all', getAllMessage);
router.get('/sermon', getAMessage);
router.get('/content', getContent);


export default router;
