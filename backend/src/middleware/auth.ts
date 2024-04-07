import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["authToken"];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const decodedJWT = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string);
    req.userId = (decodedJWT as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
