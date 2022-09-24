import express from 'express'
import { googleAuth, signin, signup, register } from '../controllers/auth.js';

const router = express.Router();

//CREATE A USER
router.post("/signup", signup)

//SIGN IN
router.post("/signin", signin)

//GOOGLE AUTH
router.post("/google", googleAuth)

//REGSITER
router.post("/register", register)

export default router;