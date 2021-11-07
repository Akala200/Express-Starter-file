import express from 'express';
import registrationRoutes from './registration';
import profileRoutes from './profile';
import authRoutes from './auth';
import adminRoutes from './admin';


const app = express();

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/reg', registrationRoutes);
app.use('/admin', adminRoutes);

export default app;
