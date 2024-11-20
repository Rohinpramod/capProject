import express from 'express';
import { userRouter } from './userRoutes.js';
import { restaurantRouter } from './restaurantRoutes.js';

const router = express.Router()

router.use('/user',userRouter);
router.use('/restaurant',restaurantRouter);

export { router as apiRouter }

