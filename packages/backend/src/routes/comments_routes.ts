import { Router } from "express";
import { addComment } from "../controllers/comments";
import authMiddleware from "../middlewares/auth_middleware";
// import authMiddleware from "../middlewares/auth_middleware";

const router = Router();

router.post("/", authMiddleware, addComment);

export default router;
