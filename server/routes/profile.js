/* eslint-disable import/named */
import { Router } from 'express';
import ProfileContoller from '../controllers/ProfileContoller';
import { auth } from '../middlewares/authMiddleware';


const router = Router();

const {
  getUser,
} = ProfileContoller;

router.get('/user/get', auth, getUser);

export default router;
