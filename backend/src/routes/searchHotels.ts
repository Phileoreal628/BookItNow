import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { param, validationResult } from "express-validator";

const router = express.Router();

router.get(
  "/getHotel/:id",
  [param("id").notEmpty().withMessage("Hotel Id is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      const hotelId = req.params.id.toString();

      const hotel = await Hotel.findOne({ _id: hotelId });

      res.status(201).send(hotel);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/search-hotels", async (req: Request, res: Response) => {
  try {
    const searchQuery = prepareSearchQuery(req.query);
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.pageNumber ? req.query.pageNumber.toString() : "1"
    );

    let sortOpts = {};
    switch (req.query.sortOpts) {
      case "priceLowToHigh":
        sortOpts = { price: 1 };
        break;
      case "priceHighToLow":
        sortOpts = { price: -1 };
        break;
      case "ratingLowToHigh":
        sortOpts = { rating: 1 };
        break;
      case "ratingHighToLow":
        sortOpts = { rating: -1 };
        break;
      default:
        break;
    }

    const pagesToSkip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(searchQuery)
      .sort(sortOpts)
      .skip(pagesToSkip)
      .limit(pageSize);

    const totalHotels = await Hotel.find(searchQuery).countDocuments();

    const response = {
      data: hotels,
      pagination: {
        totalHotels,
        pageNumber,
        pages: Math.ceil(totalHotels / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

export default router;

const prepareSearchQuery = (query: any) => {
  try {
    let searchQuery: any = {};
    if (query.destination) {
      searchQuery.$or = [
        {
          city: new RegExp(query.destination, "i"),
        },
        {
          country: new RegExp(query.destination, "i"),
        },
      ];
    }
    // $get -> greater than or equal to
    if (query.adultMemberCount) {
      searchQuery.adultMemberCount = {
        $gte: parseInt(query.adultMemberCount),
      };
    }
    // $get -> greater than or equal to
    if (query.childrenCount) {
      searchQuery.childrenCount = {
        $gte: parseInt(query.childrenCount),
      };
    }
    // To add filter hotel features
    if (query.facilities) {
      searchQuery.facilities = {
        $all: Array.isArray(query.facilities)
          ? query.facilities
          : [query.facilities],
      };
    }
    if (query.type) {
      searchQuery.type = {
        $in: Array.isArray(query.type) ? query.type : [query.type],
      };
    }
    if (query.rating) {
      searchQuery.rating = {
        $in: Array.isArray(query.rating)
          ? query.rating.map((star: string) => parseInt(star))
          : parseInt(query.rating),
      };
    }
    // $lte -> less than equal to
    if (query.price) {
      searchQuery.price = { $lte: parseInt(query.price.toString()) };
    }
    return searchQuery;
  } catch (error) {
    console.error(error);
    return {};
  }
};
