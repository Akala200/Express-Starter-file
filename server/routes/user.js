import { Router } from 'express';
import UserController from '../controllers/UserController';
import { auth } from '../middlewares/authMiddleware';


const router = Router();

const {
  newUser,
  login
} = UserController;

router.post('/create', newUser);
router.post('/login', login);


export default router;
