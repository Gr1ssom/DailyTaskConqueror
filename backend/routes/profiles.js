import express from "express";
import {
  createProfile,
  getAllProfiles,
  getProfile,
  getProfileInfo,
  updateProfile
} from "../controllers/profiles.js";

const router = express.Router();

router.get('/', getAllProfiles);
router.post('/', createProfile);

router.get('/me/info/', getProfileInfo);
router.get('/me', getProfile);
router.put('/me', updateProfile);

export default router;
