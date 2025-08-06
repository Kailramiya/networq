import express from 'express';
import {checkAuth, postLogout, postRegister, postLogin } from "../controllers/auth.controller.js";
import { protectRoute } from '../middleware/auth.middleware.js';

const router= express.Router();
router.post('/register', postRegister);
router.post('/login', postLogin);
router.post('/logout', postLogout);

router.get('/check',protectRoute,checkAuth);
export default router; 