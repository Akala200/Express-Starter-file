/* eslint-disable import/named */
import { Router } from 'express';
import AdminController from '../controllers/AdminController';


const router = Router();

const {
  getUserForAdmin,
  getAllUser,
} = AdminController;

router.get('/user/get', getUserForAdmin);
router.get('/user/all', getAllUser);


export default router;
