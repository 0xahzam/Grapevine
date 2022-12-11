import axios from "axios";

const url = "https://api.twitter.com/2/oauth2/token";
const axiosClient = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const getAccessToken = async (
  clientId,
  authCode,
  redirectUri,
  codeVerifier,
  refreshToken
) => {
  //const bodyParams = {
  //grant_type: "refresh_token",
  //client_id: clientId,
  //refresh_token: refreshToken,
  //redirect_uri: redirectUri,
  //code_verifier: codeVerifier,
  //code: authCode,
  // };
  const bodyParams = {
    grant_type:
      refreshToken == undefined ? "authorization_code" : "refresh_token",
    client_id: clientId,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
    code: authCode,
    refresh_token: refreshToken,
  };
  const formData = new URLSearchParams();
  for (const key in bodyParams) {
    formData.append(key, bodyParams[key]);
  }

  try {
    const res = await axiosClient.post("", formData);

    return {
      success: true,
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token,
    };
  } catch (err) {
    console.log(err?.response?.data, "errr22");
    return {
      success: false,
      error: err?.response?.data,
    };
  }
};
