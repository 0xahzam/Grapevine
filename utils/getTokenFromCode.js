import axios from "axios";

export const getTokenFromCode = async (authCode, codeV, refreshToken) => {
  console.log(authCode, codeV, refreshToken , 5)
  try {
    const { data } = await axios.post(
      "/api/twitter/token",
      {
        authCode,
        codeV,
        refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!data.success) throw new Error("Failed to get access token");
    return {
      success: true,
      accessToken: data.data,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    console.log("Error while getting access token", error);
    return { success: false, error };
  }
};
