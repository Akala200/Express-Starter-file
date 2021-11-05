import express from 'express';
import userRoutes from './user';

import authRoutes from './auth';


const app = express();

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

export default app;
