import axios from "axios";

export const getUser = async (authHeader) => {
  try {
    const res = await axios.get(
      "https://api.twitter.com/2/users/me?user.fields=profile_image_url",
      {
        headers: {
          Authorization: `Bearer ${authHeader}`,
        },
      }
    );
    return {
      user: res.data.data,
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: err?.response?.data,
    };
  }
};
