import posts from "../controllers/posts";
import { Router } from "express";
import authMiddleware from "../middlewares/auth_middleware";

const router = Router();
router.get("/:id", authMiddleware, posts.getPost);
router.get("/", authMiddleware, posts.getAllPosts);
router.get("/myPosts", authMiddleware, posts.getMyPosts);

router.post("/", authMiddleware, posts.addPost);
router.delete("/:id", authMiddleware, posts.deletePost);
router.put("/:id", authMiddleware, posts.updatePost);

export default router;
