import axios from 'axios';
import BASEURL from '../config/configBaseURL';
import qs from 'qs';

const axiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 20000
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

export function requestWithForm(url, datas) {
  let paragram = qs.stringify(datas);
  return axiosInstance.post(url, paragram, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
}

export function getWithJson(url, datas) {
  return axiosInstance({
    method: 'get',
    url,
    params: datas,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
}

export function postWithJson(url, datas) {
  let paragram = JSON.stringify(datas);
  return axiosInstance.post(url, paragram, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  });
}

export function requestFileForm(url, datas) {
  return axiosInstance.post(url, datas, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
