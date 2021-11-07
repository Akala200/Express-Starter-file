import express from 'express';
import registrationRoutes from './registration';
import profileRoutes from './profile';
import authRoutes from './auth';
import adminRoutes from './admin';
import apiCheck from '../middlewares/apiCheck';


const app = express();

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/reg', registrationRoutes);
app.use('/admin', apiCheck, adminRoutes);

export default app;
