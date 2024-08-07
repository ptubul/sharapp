import express from "express";
import auth from "../controllers/auth";
// import login from '../controllers/auth'
const router = express.Router();

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.post("/register", auth.register);
router.post("/google", auth.googleSignin);

export default router;
