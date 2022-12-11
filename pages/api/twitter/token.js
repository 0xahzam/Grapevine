// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAccessToken } from "../../../utils/twitter/getAccessToken";

const clientID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;

export default async function handler(req, res) {
  const { body } = req;
  const { authCode, codeV, refreshToken } = body;
  try {
    console.log(refreshToken, "check5");
    if (!clientID || !redirectURI) throw new Error("Missing .env variables");
    const accessTokenRes = await getAccessToken(
      clientID,
      authCode,
      redirectURI,
      codeV,
      refreshToken
    );
    console.log(refreshToken, accessTokenRes, "check2");
    if (!accessTokenRes?.success) return res.status(500).json(accessTokenRes);
    const accessToken = accessTokenRes.accessToken;
    const refreshTokenn = accessTokenRes.refreshToken;
    return res
      .status(200)
      .json({ success: true, data: accessToken, refresh_token: refreshTokenn });
  } catch (error) {
    console.log(error, 14);
    return res
      .status(500)
      .json({ success: false, error: error?.response?.data });
  }
}
