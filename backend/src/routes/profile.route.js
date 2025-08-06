import express from 'express';
import {protectRoute} from '../middleware/auth.middleware.js';
import { getProfilebyUserId,getPostsByUserId } from '../controllers/profile.controller.js';
const router = express.Router();

router.get('/:userId', protectRoute,getProfilebyUserId);
router.get('/:userId/posts', protectRoute, getPostsByUserId);

export default router;
