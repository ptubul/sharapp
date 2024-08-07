import { Request, Response } from "express";
import User, { UserModel } from "../models/user_model";
import { MongooseError } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { AuthRequest } from "../middlewares/auth_middleware";

const client = new OAuth2Client();
const googleSignin = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload?.email;
    if (email != null) {
      let user = await User.findOne({ email: email });
      if (user == null) {
        user = await User.create({
          email: email,
          password: "0",
          name: payload?.name,
          imgUrl: payload?.picture,
        });
      }
      const tokens = await genTokens(user);
      res.status(200).send({
        email: user.email,
        userId: user._id,
        userName: payload?.name,
        // imgUrl: user.imgUrl,
        ...tokens,
      });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

const login = async (req: Request, res: Response) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser == null) {
    return res.status(400).send("user not existing");
  }

  const match = await bcrypt.compare(req.body.password, existingUser.password);
  if (!match) {
    return res.status(401).send("email or password is incorrect");
  }
  const tokens = await genTokens(existingUser);
  res.status(200).send(tokens);
};

const logout = async (req: Request, res: Response) => {
  console.log(req.headers);
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  console.log(refreshToken);
  if (refreshToken == null) return res.sendStatus(401);

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as Secret,
    async (err, user) => {
      console.log(err?.message);
      if (err) return res.sendStatus(401);
      try {
        const myUser = user as JwtPayload;
        const userId = myUser["_id"];
        const userDb = await User.findOne({ _id: userId });
        if (!userDb) return res.sendStatus(401);
        if (
          !userDb.refreshTokens ||
          !userDb.refreshTokens.includes(refreshToken)
        ) {
          userDb.refreshTokens = [];
          await userDb.save();
          return res.sendStatus(401);
        } else {
          userDb.refreshTokens = userDb.refreshTokens.filter(
            (t) => t !== refreshToken
          );
          await userDb.save();
          return res.sendStatus(200);
        }
      } catch (err) {
        res.sendStatus(401).send(err);
      }
    }
  );
};

const register = async (req: Request, res: Response) => {
  const user = req.body;
  const newUser = new User(user);

  if (!newUser.email || !newUser.password) {
    return res.status(400).send("Fill email and password");
  }

  const existingUser = await User.findOne({ email: newUser.email });
  if (existingUser != null) {
    return res.status(400).send("user also registered");
  }

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(newUser.password, salt);
  newUser.password = encryptedPassword;

  try {
    await newUser.save();
    return res.status(200).send(newUser);
  } catch (error) {
    const mongooseError = error as MongooseError;
    console.log(mongooseError);
    return res.status(400).send("registration failed");
  }
};

const genTokens = async (user: UserModel) => {
  const accessToken = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET as Secret,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );

  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.JWT_REFRESH_SECRET as Secret
  );
  if (user.refreshTokens == null) {
    user.refreshTokens = [refreshToken];
  } else {
    user.refreshTokens.push(refreshToken);
  }

  await user.save();
  return { accessToken, refreshToken };
};

// interface UserPayload extends JwtPayload {
//   _id: string;
// }

const refresh = async (req: Request, res: Response) => {
  // const refreshToken = extractToken(req);
  // if (refreshToken == null) {
  //   return res.sendStatus(401);
  // }
  // try {
  //   jwt.verify(
  //     refreshToken,
  //     process.env.TOKEN_SECRET,
  //     async (err, data: jwt.JwtPayload) => {
  //       if (err) {
  //         return res.sendStatus(403);
  //       }
  //       const user = await User.findOne({ _id: data._id });
  //       if (user == null) {
  //         return res.sendStatus(403);
  //       }
  //       if (!user.tokens.includes(refreshToken)) {
  //         user.tokens = [];
  //         await user.save();
  //         return res.sendStatus(403);
  //       }
  //       user.tokens = user.tokens.filter((token) => token !== refreshToken);
  //       const tokens = await generateTokens(user);
  //       if (tokens == null) {
  //         return res.status(400).send("Error generating tokens");
  //       }
  //       return res.status(200).send(tokens);
  //     }
  //   );
  // } catch (err) {
  //   return res.status(400).send(err.message);
  // }
};

export default {
  login,
  logout,
  register,
  refresh,
  googleSignin,
};
