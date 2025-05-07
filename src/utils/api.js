import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/api/v1/`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const modifiedConfig = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      return modifiedConfig;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/sign_in";
    }
    return Promise.reject(error);
  }
);

const get = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error making GET request to ${url}:`, error);
    throw error;
  }
};

const post = async (url, data, headers = {}) => {
  try {
    const response = await api.post(url, data, headers);
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${url}:`, error);
    throw error;
  }
};

const put = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error(`Error making PUT request to ${url}:`, error);
    throw error;
  }
};

const remove = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error(`Error making DELETE request to ${url}:`, error);
    throw error;
  }
};

export { get, post, put, remove };
