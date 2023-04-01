import axios, { AxiosRequestConfig } from 'axios';
import { DOMAIN } from '../utils/setting';
import { TOKEN_CYBERSOFT, ACCESS_TOKEN } from '../utils/setting';
import { AxiosResponse, AxiosError } from 'axios';
import { alertToast } from '../utils/alert';
import { Bounce } from 'react-toastify';
export const http = axios.create({
   baseURL: DOMAIN,
   timeout: 30000,
   headers: {
      TokenCybersoft: TOKEN_CYBERSOFT,
   },
});

http.interceptors.request.use(
   (config: any) => {
      config.headers = {
         ...config.headers,
         Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
      };
      return { ...config };
   },
   function (error) {
      return Promise.reject(error);
   }
);

http.interceptors.response.use(
   function (response) {
      if (response.data.content) {
         return response;
      }
      return response;
   },
   function (error) {
      if (error.response.data) {
         if (error.response.data.statusCode === 403) {
            alertToast.error(`${error.response.data.content}`, 'top-center', Bounce, 'colored')
         } else {
            alertToast.error(`${error.response.data.message}`, 'top-center', Bounce, 'colored')
         }
         return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
   }
);
