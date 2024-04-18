import axios from 'axios';
import { redirect } from 'react-router-dom';
import GlobalFunction from './GlobalFunction';

axios.interceptors.request.use(function (config) {
    if (localStorage.token !== undefined){
        config.headers['Authorization'] = `Bearer ${localStorage.token}`
      }
    return config;

  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger

    return response;
  }, function (error) {
        if(error.response.status === 401){
          GlobalFunction.logOut()
        }else if (error.response.status === 500){
            redirect('/error-500')
        }
    return Promise.reject(error);
  });