import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import "dotenv/config";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(res => console.log(res + "DB Connected"));

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/v1/auth", userRoutes);
app.listen(8888, () => {
  console.log("Server is Up.");
});
