/* eslint-disable import/named */
import { Router } from 'express';
import AuthController from '../controllers/AuthController';


const router = Router();

const {
  manualLogin,
  generateAuthGoogleUrl
} = AuthController;

router.post('/manual/login', manualLogin);
router.post('/google/auth', generateAuthGoogleUrl);


export default router;
