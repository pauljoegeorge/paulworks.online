export const saveAuthToken = (authToken) =>
  localStorage.setItem("authToken", authToken);

export const getAuthToken = () => localStorage.getItem("authToken");
