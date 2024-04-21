type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePayment: Promise<Stripe | null>;
};

type SearchContext = {
  destination: string;
  checkInTime: Date;
  checkOutTime: Date;
  adultMemberCount: number;
  childrenCount: number;
  hotelId: string;
  saveSearchValue: (
    destination: string,
    checkInTime: Date,
    checkOutTime: Date,
    adultMemberCount: number,
    childrenCount: number,
    hotelId?: string
  ) => void;
  resetSearch: () => void;
};

type SearchContextProvider = {
  children: React.ReactNode;
};

type ToastPros = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

type SignInType = {
  email: string;
  password: string;
};

type HotelFormData = {
  type: string;
  name: string;
  city: string;
  country: string;
  description: string;
  adultMemberCount: number;
  childrenCount: number;
  price: number;
  rating: number;
  facilities: string[];
  imageFiles: FileList;
  imageURIs: string[];
};

type HotelType = {
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

type searchParams = {
  destination: string;
  checkInTime: string;
  checkOutTime: string;
  adultMemberCount: string;
  childrenCount: string;
  pageNumber: string;
  type?: string[];
  facilities?: string[];
  rating?: string[];
  price?: string;
  sortOpts?: string;
};

type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    totalHotels: number;
    page: number;
    pages: number;
  };
};

type PaginationData = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

type ratingFilter = {
  selectedRating: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type FacilityFilter = {
  selectedFacility: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type HotelTypeFilter = {
  selectedHotelType: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type PriceFilter = {
  selectedPrice: number | undefined;
  onChange: (price?: number) => void;
};

type GuestInfoFormData = {
  checkInTime: Date;
  checkOutTime: Date;
  adultMemberCount: number;
  childrenCount: number;
};

type GuestInfoData = {
  hotelId: string;
  pricePerNight: number;
};

type BookingUserType = {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
};

type BookingSummary = {
  hotel: HotelType;
  checkIn: Date;
  checkOut: Date;
  adultMemberCount: number;
  childrenCount: number;
  nightOfStay: number;
};

type BookingType = {
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

type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  checkIn: string;
  checkOut: string;
  adultMemberCount: number;
  childrenCount: number;
  totalCost: number;
  hotelId: string;
  paymentIntentId: string;
};
