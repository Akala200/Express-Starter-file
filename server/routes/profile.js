/* eslint-disable import/named */
import { Router } from 'express';
import ProfileContoller from '../controllers/ProfileContoller';
import { auth } from '../middlewares/authMiddleware';


const router = Router();

const {
  getUser,
  updateUser,
} = ProfileContoller;

router.get('/get', auth, getUser);
router.put('/update', auth, updateUser);

export default router;
