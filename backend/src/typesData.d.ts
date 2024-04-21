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
  imageURIs: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  adultMemberCount: number;
  childrenCount: number;
  totalCost: number;
};
