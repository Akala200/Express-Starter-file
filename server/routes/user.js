/* eslint-disable import/named */
import { Router } from 'express';
import UserController from '../controllers/UserController';
import { auth } from '../middlewares/authMiddleware';


const router = Router();

const {
  newUser,
  completeUserReg
} = UserController;

router.post('/create', newUser);
router.post('/complete/reg', completeUserReg, auth);


export default router;
