import axios from "axios";
import { getUser } from "./getUser";

export const fetchBookmarks = async (accessToken, query, userId) => {
  try {
    // if (!accessTokenRes?.success) return accessTokenRes;
    // const accessToken = accessTokenRes.accessToken;
    if (!accessToken) return { success: false, error: "Missing access token" };

    /**
     * 2. Get user info
     */
    let user = "";
    if (!query.includes("pagination_token")) {
      const userRes = await getUser(accessToken);

      if (!userRes?.success) return userRes;
      user = userRes?.user;

      if (!user?.id) return { success: false, error: "Missing user" };

      // login analytics
      // const res = await axios.get(
      //   `https://DeclutrBeta.nadaafarook.repl.co/user?id=${user?.id}&username=${user?.username}`
      // );
    }

    const res = await axios.get(
      `https://api.twitter.com/2/users/${
        user.id ? user.id : userId
      }/bookmarks?${query}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    let media = res.data.includes.media || [];
    let bookmarks = res.data.data;
    let users = res.data.includes.users;

    bookmarks = bookmarks.map((e) =>
      e.attachments?.media_keys
        ? {
            ...e,
            attachments: e.attachments.media_keys.map((f) =>
              media.find((e) => e.media_key == f)
            ),
          }
        : e
    );
    return {
      success: true,
      data: {
        bookmarks: bookmarks,
        media: media,
        users: users,
        "next-token": res.data.meta.next_token,
        user,
      },
    };
  } catch (err) {
    console.log(err, "err");
    return {
      success: false,
      error: err?.response?.data,
    };
  }
};
