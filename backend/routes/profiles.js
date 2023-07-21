import express from "express";
import { getProfile, getProfileInfo, updateProfile } from "../controllers/profiles.js";

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);

router.get('/me/info/', getProfileInfo);

router.get('/me', getProfile);

router.put('/me', updateProfile);


export default router;