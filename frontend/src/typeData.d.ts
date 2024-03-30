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
};

type ToastPros = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};
