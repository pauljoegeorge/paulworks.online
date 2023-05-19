import { useState } from "react";
import { get } from "../../../utils/api";
import { saveAuthToken, getAuthToken } from "../../../utils/auth";

function useOAuth() {
  const [isLoading, setLoading] = useState(false);
  const [oauthUrl, setOauthUrl] = useState(null);
  const [userToken, setToken] = useState(getAuthToken() || null);

  const getOAuthUrl = async () => {
    const response = await get("auth/google");
    const { url } = response;
    setOauthUrl(url);
  };

  const startOAuth = async (code) => {
    setLoading(true);
    const response = await get(`auth/google/callback?code=${code}`);
    const { token } = response;
    saveAuthToken(token);
    setToken(token);
    setLoading(false);
  };

  return {
    isLoading,
    oauthUrl,
    userToken,
    actions: {
      getOAuthUrl,
      startOAuth,
    },
  };
}

export { useOAuth };
