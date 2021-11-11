/* eslint-disable import/named */
import { Router } from 'express';
import ProfileContoller from '../controllers/ProfileContoller';
import { auth } from '../middlewares/authMiddleware';
import upload from '../utils/multer';

const router = Router();

const {
  getUser,
  updateUser,
  uplaodAvarta
} = ProfileContoller;

router.get('/get', auth, getUser);
router.put('/update', auth, updateUser);
router.post('/upload', upload.single('image'), auth, uplaodAvarta);

export default router;
