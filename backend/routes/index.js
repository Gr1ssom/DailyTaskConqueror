import express from "express";
import { checkAuth } from "../utils/auth.js";
import authRoutes from './auth.js';
import profileRoutes from './profiles.js';
import tasksRoutes from './tasks.js';
import Login from "../../frontend/src/pages/Login.js";

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profiles', checkAuth, profileRoutes);
router.use('/tasks', checkAuth, tasksRoutes);
router.use('/', Home.js);


export default router;