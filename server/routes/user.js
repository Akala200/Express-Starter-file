/* eslint-disable import/named */
import { Router } from 'express';
import RegController from '../controllers/RegController';
import { auth } from '../middlewares/authMiddleware';


const router = Router();

const {
  newUser,
  completeUserReg,
  verify,
  getUser
} = RegController;

router.post('/create', newUser);
router.post('/verify', verify);
router.post('/complete/reg', auth, completeUserReg);
router.get('/get', auth, getUser);

export default router;
