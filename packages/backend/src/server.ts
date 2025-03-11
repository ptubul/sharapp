import env from "dotenv";
env.config();

import express from "express";
import authRouter from "./routes/auth_routes";
import mongoose from "mongoose";
import postsRouter from "./routes/posts_routes";
import userRouter from "./routes/user_routes";
import commentsRouter from "./routes/comments_routes";
import upload from "./middlewares/multer";
import cors from "cors";
import path from "path";
const db = mongoose.connection;
db.once("open", () => console.log("DB connected"));
db.on("error", (error) => console.error(error));
const url = process.env.DB_URL;
if (!url) throw "DB_URL argument was not supplied";

mongoose.connect(url).then(() => {
  const corsOptions = {
    origin: "http://localhost:5173", // Allow requests only from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow only GET and POST requests
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "20mb" }));
  app.use(express.json({ limit: "20mb" }));
  app.use(upload.single("file"));

  app.use(
    "/postsImages",
    express.static(
      path.join(
        "C:\\Users\\97254\\Documents\\final\\sharapp\\packages\\backend",
        "public",
        "postsImages"
      )
    )
  );
  app.use(cors(corsOptions));
  app.use("/auth", authRouter);
  app.use("/posts", postsRouter);
  app.use("/user", userRouter);
  app.use("/comments", commentsRouter);
  app.listen(3000, () => console.log("app is listening"));
});
