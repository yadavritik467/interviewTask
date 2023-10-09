import express from 'express';
import { createProfile, deletingProfile, getProfileDetails, updateProfile } from '../controller/profile.js';
import { requireSignIn } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/create',requireSignIn,createProfile)
router.get('/getProfile',requireSignIn,getProfileDetails)
router.put('/edit/:id',requireSignIn,updateProfile)
router.delete('/delete/:id',requireSignIn,deletingProfile)


export default router;