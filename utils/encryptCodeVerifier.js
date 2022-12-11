import { createHash } from "crypto";

const base64Urlencode = (str) => {
  const buf = Buffer.from(str, "base64");
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const encryptCodeVerifier = (codeVerifier) => {
  return base64Urlencode(
    createHash("sha256").update(codeVerifier).digest("base64")
  );
};
