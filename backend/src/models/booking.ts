import mongoose from "mongoose";
import { BookingType } from "../typesData";

export const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  email: { required: true, type: String },
  adultMemberCount: { required: true, type: Number },
  childrenCount: { required: true, type: Number },
  checkIn: { required: true, type: Date },
  checkOut: { required: true, type: Date },
  userId: { required: true, type: String },
  totalCost: { required: true, type: Number },
});
