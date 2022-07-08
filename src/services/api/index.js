import axios from "axios";
import config from "../../config";
import storage from "./../storage";
import NProgress from "nprogress";
import "nprogress/nprogress.css";


NProgress.configure({
    showSpinner: true,
    trickleRate: 0.02,
    trickleSpeed: 400,
    easing: "ease",
    speed: 200
});

//hrms base url
const hrmsRequest = axios.create({
  baseURL: config.API_ROOT,
  headers: {
    common: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8"
    }
  }
});

hrmsRequest.interceptors.request.use(
  function (config) {
    NProgress.inc(0.5);
    if (!config.headers.Authorization) {
      const token = storage.get("token");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    NProgress.done(true);
    return Promise.reject(error);
  }
);
hrmsRequest.interceptors.response.use(
  function (response) {
    NProgress.done(true);
    return response;
  },
  function (error) {
    NProgress.done(true);
    return Promise.reject(error);
  }
);
//! hrms base url

//bpmn base url
const bpmnRequest = axios.create({
    baseURL: config.BPMN_API_ROOT,
    headers: {
        common: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8"
        }
    }
});

bpmnRequest.interceptors.request.use(
    function (config) {
        NProgress.inc(0.5);
        if (!config.headers.Authorization) {
            const token = storage.get("token");
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        NProgress.done(true);
        return Promise.reject(error);
    }
);
bpmnRequest.interceptors.response.use(
    function (response) {
        NProgress.done(true);
        return response;
    },
    function (error) {
        NProgress.done(true);
        return Promise.reject(error);
    }
);
//!bpmn base url
export {hrmsRequest,bpmnRequest};
