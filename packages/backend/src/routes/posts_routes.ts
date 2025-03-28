import posts from "../controllers/posts";
import { Router } from "express";
import authMiddleware from "../middlewares/auth_middleware";

const router = Router();

router.post("/", authMiddleware, posts.addPost);
router.delete("/:id", authMiddleware, posts.deletePost);
router.put("/:id", authMiddleware, posts.updatePost);
router.get("/myPosts", authMiddleware, posts.getMyPosts);
router.get("/:id", authMiddleware, posts.getPost);
router.get("/", authMiddleware, posts.getAllPosts);

export default router;
