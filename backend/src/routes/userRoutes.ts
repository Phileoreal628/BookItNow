import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password of min length 6 is required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_PRIVATE_KEY as string,
        {
          expiresIn: "2d",
        }
      );

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).send({ message: "User created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Email is not correct.").isEmail(),
    check("password", "Password must be of more than 6 characters.").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ message: errors.array() });
    }
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.status(400).send({ message: "Invalid Credentials" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).send({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_PRIVATE_KEY as string,
        {
          expiresIn: "2d",
        }
      );

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).json({ userId: user._id });
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  }
);

export default router;
