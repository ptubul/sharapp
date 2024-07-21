import { Router } from "express";
import { addComment } from "../controllers/comments";
// import authMiddleware from "../middlewares/auth_middleware";

const router = Router();

router.post("/", addComment);

export default router;
