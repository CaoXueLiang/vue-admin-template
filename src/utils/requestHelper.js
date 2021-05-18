/* eslint-disable no-param-reassign */
import axios from "axios";
import BASEURL from "../config/configBaseURL";
import qs from "qs";

const axiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 100000
});

//请求拦截
axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return err;
  }
);

//响应拦截
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    return err;
  }
);

const requestInstance = {
  requestWithForm(config) {
    let paragram = {
      url: config.url,
      data: qs.stringify(config.data),
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    };
    return axiosInstance(paragram);
  },

  requestWithJson(config) {
    let paragram = Object.assign(config, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return axiosInstance(paragram);
  },

  requestWithData(config) {
    let paragram = Object.assign(config, {
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return axiosInstance(paragram);
  }
};

export default requestInstance;
