import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import hotelRoutes from "./routes/myHotels";
import searchHotels from "./routes/searchHotels";
import bookingRoutes from "./routes/bookings";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";
const bodyParser = require("body-parser");

import { v2 as cloudinary } from "cloudinary";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(res => console.log("DB Connected at "));
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/hotels", hotelRoutes);
app.use("/api/v1/hotels", searchHotels);
app.use("/api/v1/hotels", bookingRoutes);

app.listen(8888, () => {
  console.log("Server is Up.");
});
