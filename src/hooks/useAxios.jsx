import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: "https://my-habit-tracker-server.vercel.app",
});

const useAxios = () => {
  const { user, logOut } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken(true);

          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        )
          return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut]);

  return axiosInstance;
};

export default useAxios;
