import express, { Request, Response } from "express";
import Stripe from "stripe";
import { verifyToken } from "../middleware/auth";
import Hotel from "../models/hotel";
import { BookingType } from "../typesData";
import "dotenv/config";
import User from "../models/user";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { nightOfStay } = req.body;
      const hotelId = req.params.hotelId;

      const hotel = await Hotel.findById(hotelId);

      if (!hotel) {
        return res.status(501).json({ message: "Hotel not found" });
      }

      const totalCost = nightOfStay * hotel.price;

      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(501).json({ message: "User not found" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost * 100,
        currency: "INR",
        description: "hotel booking",
        shipping: {
          name: `${user.firstName} ${user.lastName}`,
          address: {
            line1: "Pune",
            postal_code: "411057",
            city: "Punr",
            state: "MH",
            country: "IN",
          },
        },
        metadata: {
          hotelId,
          userId: req.userId,
        },
      });

      if (!paymentIntent.client_secret) {
        return res
          .status(500)
          .json({ message: "Error creating payment intent" });
      }

      res.send({
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        totalCost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating payment intent" });
    }
  }
);

router.post(
  "/:hotelId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const paymentIntentId = req.body.paymentIntentId;

      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId as string
      );

      if (!paymentIntent) {
        return res.status(400).json({ message: "Payment Intent is not valid" });
      }

      if (
        paymentIntent.metadata.hotelId !== req.params.hotelId ||
        paymentIntent.metadata.userId !== req.userId
      ) {
        return res.status(400).json({ message: "Payment Intent is not valid" });
      }

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          message: `Payment Intent Failed , Status: ${paymentIntent.status}`,
        });
      }

      const newBooking: BookingType = {
        ...req.body,
        userId: req.userId,
      };

      const hotelToUpdate = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
        },
        {
          $push: { bookings: newBooking },
        }
      );

      if (!hotelToUpdate) {
        return res.status(400).json({ message: "Hotel not found" });
      }
      await hotelToUpdate.save();
      res.status(201).json({ message: "Booking Successful" });
    } catch (error) {
      console.error(error);
      res.status(501).json({ message: "Something Went Wrong" });
    }
  }
);
router.get("/my-bookings", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: userId } },
    });

    const bookings = hotels.map(hotel => {
      const userBookings = hotel.bookings.filter(
        book => book.userId === userId
      );

      const hotelWithBooking = {
        ...hotel.toObject(),
        bookings: userBookings,
      };
      return hotelWithBooking;
    });

    res.status(201).send(bookings);
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "Something Went Wrong" });
  }
});
export default router;
