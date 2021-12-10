/* eslint-disable import/named */
import { Router } from 'express';
import AuthController from '../controllers/AuthController';


const router = Router();

const {
  manualLogin,
  googleAuth,
  googleRedirect,
  forgetPassword,
  confirmPassword,
  resendCode,
  facebookAuth
} = AuthController;

router.post('/manual/login', manualLogin);
router.post('/google/auth', googleAuth);
router.get('/google/verification', googleRedirect);
router.post('/forgot/password', forgetPassword);
router.post('/confirm/password', confirmPassword);
router.post('/resend/code', resendCode);
router.post('/facebook/auth', facebookAuth);

export default router;
