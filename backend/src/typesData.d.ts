export type HotelType = {
  type: string;
  _id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  userid: string;
  adultMemberCount: number;
  childrenCount: number;
  price: number;
  rating: number;
  facilities: string[];
  images: string[];
  lastUpdated: Date;
};
