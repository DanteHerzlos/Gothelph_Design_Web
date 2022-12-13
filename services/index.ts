// import AuthService from "./AuthService";

const baseURL = process.env.API_URL;
const $host = async (url: string, ...params: RequestInit[]) => {
  const res = await fetch(baseURL + url, ...params);
  return res.json();
};

const $authHost = async (url: string, ...params: RequestInit[]) => {
  const res = await fetch("/api" + url, ...params);
  return res.json();
}; //credentials

// $authHost.interceptors.request.use((config: AxiosRequestConfig) => {
//   config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
//   return config;
// });

// $authHost.interceptors.response.use(
//   (config: AxiosResponse) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       try {
//         originalRequest._isRetry = true;
//         const response = await AuthService.refresh();

//         localStorage.setItem("token", response.data.accessToken);
//         return $authHost.request(originalRequest);
//       } catch (e) {
//         console.log("Неавторизованный пользователь");
//       }
//     }
//     throw error;
//   }
// );

export { $host, $authHost };
