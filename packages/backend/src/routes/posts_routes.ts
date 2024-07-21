import posts from "../controllers/posts";
import { Router } from "express";
import authMiddleware from "../middlewares/auth_middleware";

const router = Router();

router.post("/", posts.addPost);
router.delete("/:id", authMiddleware, posts.deletePost);
router.put("/:id", authMiddleware, posts.updatePost);
router.get("/:id", posts.getPost);
router.get("/", posts.getAllPosts);

export default router;
