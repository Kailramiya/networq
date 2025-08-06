import express from 'express';
import Post from '../models/post.model.js';
import {protectRoute} from '../middleware/auth.middleware.js';
import { createPost, getPosts } from '../controllers/post.controller.js';
const router = express.Router();

router.post('/createpost', protectRoute,createPost);
router.get('/', protectRoute, getPosts);


export default router;
