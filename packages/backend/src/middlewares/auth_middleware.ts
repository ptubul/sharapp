import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { _id: string };
}
const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET as Secret, (err, user) => {
    console.log(err?.message);
    if (err) return res.sendStatus(401);
    req.user = user as { _id: string };
    next();
  });
};

export default authMiddleware;
