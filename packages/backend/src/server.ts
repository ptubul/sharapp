import env from "dotenv";
env.config();

import express from "express";
import authRouter from "./routes/auth_routes";
import mongoose from "mongoose";
import postsRouter from "./routes/posts_routes";
import upload from "./middlewares/multer";

const db = mongoose.connection;
db.once("open", () => console.log("DB connected"));
db.on("error", (error) => console.error(error));
const url = process.env.DB_URL;
if (!url) throw "DB_URL argument was not supplied";

mongoose.connect(url).then(() => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(upload.single("image"));
  app.use("/auth", authRouter);
  app.use("/posts", postsRouter);
  app.listen(3000, () => console.log("app is listening"));
});
