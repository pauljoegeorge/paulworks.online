import { useState } from "react";
import { get, put } from "../../../utils/api";
import {
  saveAuthToken,
  getAuthToken,
  saveCurrentUser,
  getCurrentUser,
} from "../../../utils/auth";
import { Notify } from "../../../components/Notify";

function useOAuth() {
  const [isLoading, setLoading] = useState(false);
  const [oauthUrl, setOauthUrl] = useState(null);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [userToken, setToken] = useState(getAuthToken() || null);

  const getOAuthUrl = async () => {
    const response = await get("auth/google");
    const { url } = response;
    setOauthUrl(url);
  };

  const startOAuth = async (code) => {
    setLoading(true);
    const response = await get(`auth/google/callback?code=${code}`);
    const { token, user } = response;
    if (token) {
      saveAuthToken(token);
      saveCurrentUser(user);
      setToken(token);
    }
    setLoading(false);
  };

  const updateCurrentUser = async (body) => {
    setLoading(true);
    try {
      const response = await put("users", body);
      saveCurrentUser(response);
      setCurrentUser(response);
      Notify.success();
    } catch {
      Notify.error();
    }
    setLoading(false);
  };

  return {
    isLoading,
    oauthUrl,
    userToken,
    currentUser,
    actions: {
      getOAuthUrl,
      startOAuth,
      updateCurrentUser,
    },
  };
}

export { useOAuth };
