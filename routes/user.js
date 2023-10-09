import express from 'express';
import { registerUser,loginUser,myProfile } from '../controller/user.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/me',requireSignIn, myProfile)


export default router;