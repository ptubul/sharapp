import express from "express";
import auth from "../controllers/auth";
// import login from '../controllers/auth'
import { Router, Request, Response } from "express";
const router = express.Router();
// const routerBetterTyping = router as unknown as Router

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.post("/register", auth.register);

export default router;
