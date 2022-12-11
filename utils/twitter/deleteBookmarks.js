import axios from "axios";

export const deleteBookmark = async (accessToken, userId, deleteId) => {
  try {
    // if (!accessTokenRes?.success) return accessTokenRes;
    // const accessToken = accessTokenRes.accessToken;

    if (!accessToken) return { success: false, error: "Missing access token" };

    const res = await axios.delete(
      `https://api.twitter.com/2/users/${userId}/bookmarks/${deleteId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(res?.headers["x-rate-limit-remaining"], 4);

    return {
      success: true,
      data: res?.data,
    };
  } catch (err) {
    console.log(err, "err");
    return {
      success: false,
      error: err?.response?.data,
      limit: {
        reset: err?.response?.headers["x-rate-limit-reset"],
        remaining: err?.response?.headers["x-rate-limit-remaining"],
      },
    };
  }
};
