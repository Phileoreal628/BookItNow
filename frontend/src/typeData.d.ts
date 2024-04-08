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
  images: FileList;
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
  images: string[];
  lastUpdated: Date;
};
