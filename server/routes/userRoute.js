import express from 'express';
import {register, login, currentUser} from "../controllers/userController"
import {verifyUser} from '../middlewares/auth';

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/current-user", verifyUser, currentUser)

export default router;
