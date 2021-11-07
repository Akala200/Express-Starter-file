/* eslint-disable import/named */
import { Router } from 'express';
import AdminController from '../controllers/AdminController';


const router = Router();

const {
  getUser,
  getAllUser,
} = AdminController;

router.get('/user/get', getUser);
router.put('/user/all', getAllUser);
