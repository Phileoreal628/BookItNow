import express, { Request, Response } from "express";
import cloudinary from "cloudinary";
import { verifyToken } from "../middleware/auth";
import multer from "multer";
import { body } from "express-validator";
import { HotelType } from "../typesData";
import Hotel from "../models/hotel";

const router = express.Router();

const multerStorage = multer.memoryStorage();

const uploadOptions = multer({
  storage: multerStorage,
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

router.post(
  "/add-hotel",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("price").notEmpty().isNumeric().withMessage("Price is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  uploadOptions.array("images", 6),
  async (req: Request, res: Response) => {
    try {
      const imagesFromClientSide = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const images = await cloudinaryUpload(imagesFromClientSide);

      newHotel.imageURIs = images;
      newHotel.lastUpdated = new Date();
      newHotel.userid = req.userId;

      const hotelToSave = new Hotel(newHotel);
      await hotelToSave.save();

      res.status(201).send(hotelToSave);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.get("/getMyHotels", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const hotels = await Hotel.find({ userid: userId });
    res.status(201).send(hotels);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get(
  "/getHotels/:id",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const hotelId = req.params.id.toString();
      const userId = req.userId;

      const hotel = await Hotel.findOne({
        _id: hotelId,
        userid: userId,
      });

      res.status(201).send(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something Went Wrong" });
    }
  }
);
router.put(
  "/update-hotel/:id",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("price").notEmpty().isNumeric().withMessage("Price is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  uploadOptions.array("images"),
  async (req: Request, res: Response) => {
    try {
      const hotelToUpdateId = req.params.id.toString();
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: hotelToUpdateId,
          userid: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      const imagesToUpload = req.files as Express.Multer.File[];
      const updatedImageURIs = await cloudinaryUpload(imagesToUpload);

      //To handle newly added and deleted images
      hotel.imageURIs = [
        ...updatedImageURIs,
        ...(updatedHotel.imageURIs || []),
      ];

      await hotel.save();
      res.status(201).send(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);
async function cloudinaryUpload(imageFiles: Express.Multer.File[]) {
  if (!imageFiles) return [];

  const imagesToUpload = imageFiles.map(async image => {
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const URI = "data:" + image.mimetype + ";base64," + base64Image;
    const responseCloudinary = await cloudinary.v2.uploader.upload(URI);
    return responseCloudinary.url;
  });

  return await Promise.all(imagesToUpload);
}

export default router;
