import express, { Request, Response } from "express";
import Stripe from "stripe";
import { verifyToken } from "../middleware/auth";
import Hotel from "../models/hotel";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    const { nightOfStay } = req.body;
    const hotelId = req.params.hotelId;

    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      return res.status(501).json({ message: "Hotel not found" });
    }

    const totalCost = nightOfStay * hotel.price;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost,
      currency: "INR",
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });
    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    }

    res.send({
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    });
  }
);
