// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { fetchBookmarks } from "../../../utils/twitter/fetchBookmarks";

export default async function handler(req, res) {
  const { body } = req;
  try {
    const { token, query, userId } = body;
    if (!token) {
      return res.status(400).json({
        success: false,
        error: "Missing token",
      });
    }
    // next token for pagination
    const bookmarkRes = await fetchBookmarks(token, query, userId);
    if (!bookmarkRes.success) {
      return res.status(400).json({
        success: false,
        error: bookmarkRes?.error,
      });
    }

    const data = bookmarkRes.data;

    if (!data) {
      return res.status(400).json({
        success: false,
        error: "Missing data",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err?.response?.data,
    });
  }
}
