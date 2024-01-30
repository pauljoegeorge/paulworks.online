export const saveAuthToken = (authToken) =>
  localStorage.setItem("authToken", authToken);

export const getAuthToken = () => localStorage.getItem("authToken");

export const saveCurrentUser = (user) =>
  localStorage.setItem("currentUser", JSON.stringify(user));

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("currentUser"));
