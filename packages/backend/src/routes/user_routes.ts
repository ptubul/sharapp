import express from "express";
import { getUser, updateUser } from "../controllers/user";
import authMiddleware from "../middlewares/auth_middleware";
const router = express.Router();

router.get("/", authMiddleware, getUser);
router.put("/", authMiddleware, updateUser);

export default router;
