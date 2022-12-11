export const generateAuthorizationURL = (
  clientId,
  redirectUri,
  state,
  scope,
  codeChallenge,
  codeChallengeMethod
) => {
  console.log(
    clientId,
    redirectUri,
    state,
    scope,
    codeChallenge,
    codeChallengeMethod
  );
  // twitter authorization url
  const queryParams = new URLSearchParams();
  queryParams.append("response_type", "code");
  queryParams.append("client_id", clientId);
  queryParams.append("redirect_uri", redirectUri);
  queryParams.append("state", state);
  queryParams.append("scope", scope.join(" "));
  queryParams.append("code_challenge", codeChallenge);
  queryParams.append("code_challenge_method", codeChallengeMethod);
  return `https://twitter.com/i/oauth2/authorize?${queryParams.toString()}`;
};
