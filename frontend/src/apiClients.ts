const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const registerUser = async (formData: RegisterFormData) => {
  const response = await fetch(`${SERVER_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseJson = await response.json();

  if (!response.ok) throw new Error(responseJson.message);

  return responseJson;
};
