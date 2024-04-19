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

export const searchHotels = async (
  searchOptions: searchParams
): Promise<HotelSearchResponse> => {
  const optionsToSend = new URLSearchParams();
  optionsToSend.append("destination", searchOptions.destination || "");
  optionsToSend.append("checkInTime", searchOptions.checkInTime || "");
  optionsToSend.append("checkOutTime", searchOptions.checkOutTime || "");
  optionsToSend.append(
    "adultMemberCount",
    searchOptions.adultMemberCount || ""
  );
  optionsToSend.append("childrenCount", searchOptions.childrenCount || "");
  optionsToSend.append("pageNumber", searchOptions.pageNumber || "");
  optionsToSend.append("price", searchOptions.price || "");
  optionsToSend.append("sortOpts", searchOptions.sortOpts || "");

  searchOptions.facilities?.forEach(facility =>
    optionsToSend.append("facility", facility)
  );

  searchOptions.type?.forEach(t => optionsToSend.append("type", t));
  searchOptions.rating?.forEach(rate => optionsToSend.append("rating", rate));

  const response = await fetch(
    `${SERVER_URL}/api/v1/hotels/search-hotels?${optionsToSend}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) throw new Error("Failed To update Hotel");
  const result = await response.json();
  return result;
};

export const getHotel = async (id: string): Promise<HotelType> => {
  const response = await fetch(`${SERVER_URL}/api/v1/hotels/getHotel/${id}`, {
    method: "GET",
  });
  if (!response.ok) throw new Error("Failed To get Hotel");
  const result = await response.json();
  return result;
};

export const getLoggedInUser = async () => {
  const response = await fetch(`${SERVER_URL}/api/v1/auth/getUser`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed To Fetch User");
  const result = await response.json();
  return result;
};
