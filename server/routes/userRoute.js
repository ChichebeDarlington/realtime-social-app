import express from 'express';
import { register, login, verifyUser } from '../controllers/userController';
import {tokenHeaders} from "../middlewares/auth.js"


const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/verify-user", tokenHeaders, verifyUser)



export default router;
