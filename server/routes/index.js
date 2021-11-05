import express from 'express';
import authRoutes from './auth';


const app = express();

app.use('/auth/', authRoutes);


export default app;
