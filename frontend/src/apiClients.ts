const SERVER_URL = import.meta.env.VITE_SERVER_URL || "";
export const registerUser = async (formData: RegisterFormData) => {
  const response = await fetch(`${SERVER_URL}/api/v1/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseJson = await response.json();

  if (!response.ok) throw new Error(responseJson.message);

  return responseJson;
};
export const verifyUser = async () => {
  const response = await fetch(`${SERVER_URL}/api/v1/auth/verify-user`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Unauthorized");

  const result = await response.json();
  return result;
};

export const signIn = async (signInData: SignInType) => {
  const response = await fetch(`${SERVER_URL}/api/v1/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signInData),
  });

  const result = await response.json();

  if (!response.ok) throw new Error(result.message);

  return result;
};

export const signOut = async () => {
  const response = await fetch(`${SERVER_URL}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error in Sign Out");
};

export const addHotel = async (hotelData: FormData) => {
  const response = await fetch(`${SERVER_URL}/api/v1/hotels/add-hotel`, {
    method: "POST",
    credentials: "include",
    body: hotelData,
  });
  if (!response.ok) throw new Error("Adding Hotel Failed");
  const result = await response.json();

  return result;
};

export const getMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${SERVER_URL}/api/v1/hotels/getMyHotels`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed To Fetch Hotels");
  const result = await response.json();

  return result;
};

export const getHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(
    `${SERVER_URL}/api/v1/hotels/getHotels/${hotelId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) throw new Error("Failed To Fetch Hotel");
  const result = await response.json();
  return result;
};

export const updateHotelById = async (hotelData: FormData) => {
  const hotelId = hotelData.get("hotelId");
  const response = await fetch(
    `${SERVER_URL}/api/v1/hotels/update-hotel/${hotelId}`,
    {
      method: "PUT",
      credentials: "include",
      body: hotelData,
    }
  );
  if (!response.ok) throw new Error("Failed To update Hotel");
  const result = await response.json();
  return result;
};
