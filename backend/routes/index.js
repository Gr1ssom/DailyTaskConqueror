import express from "express";
import { checkAuth } from "../utils/auth.js";
import authRoutes from './auth.js';
import profileRoutes from './profiles.js';
import tasksRoutes from './tasks.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profiles', checkAuth, profileRoutes);
router.use('/tasks', checkAuth, tasksRoutes);


export default router;