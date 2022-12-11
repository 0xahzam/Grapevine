// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { deleteBookmark } from "../../../utils/twitter/deleteBookmarks";

export default async function handler(req, res) {
  const { body } = req;
  try {
    const { accessToken, userId, deleteIds } = body;
    console.log(accessToken, userId, deleteIds, 99);
    if (!accessToken) {
      return res.status(400).json({
        success: false,
        error: "Missing token",
      });
    }
    console.log(1);
    let count = 0;
    const resss = deleteIds.map(async (deleteId, item) => {
      console.log(2);

      const bookmarkRes = await deleteBookmark(accessToken, userId, deleteId);
      count = count + 1;
      console.log(bookmarkRes?.success, item, count, "bookmarkres");
      if (count == deleteIds.length) {
        if (!bookmarkRes.success) {
          console.log("deleting 1");
          return res.status(bookmarkRes?.error?.status).json({
            success: false,
            error: bookmarkRes?.error,
            limit: bookmarkRes?.limit,
          });
        } else {
          console.log("deleted all");
          return res.status(200).json({
            success: true,
            data: "yay",
          });
        }
      }
      if (!bookmarkRes.success) {
        console.log("deleting");
        return res.status(bookmarkRes?.error?.status).json({
          success: false,
          error: bookmarkRes?.error,
          limit: bookmarkRes?.limit,
        });
      }
    });
    console.log(resss, "ressssss");
  } catch (err) {
    console.log(err?.response, "ress");
    res.status(500).json({
      success: false,
      error: err?.response?.data,
    });
  }
}

// {
//   "success": false,
//   "error": {
//       "title": "Too Many Requests",
//       "detail": "Too Many Requests",
//       "type": "about:blank",
//       "status": 429
//   },
//   "limit": {
//       "reset": "1659949693",
//       "remaining": "0"
//   }
// }
