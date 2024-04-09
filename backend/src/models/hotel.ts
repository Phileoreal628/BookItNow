import mongoose from "mongoose";
import { HotelType } from "../typesData";

const hotelSchema = new mongoose.Schema<HotelType>({
  type: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  userid: { type: String, required: true },
  adultMemberCount: { type: Number, required: true },
  childrenCount: { type: Number, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  facilities: [{ type: String, required: true }],
  imageURIs: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;
