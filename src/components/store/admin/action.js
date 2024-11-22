import axios from "axios";
import { GET_ALL_USERS_ADMIN ,NOT_REDIRECT,GET_COUNT_ADMIN,GET_GRAPH_DATA,GET_FIRST_GRAPH_DATA,GET_COUNT_DATA,GET_STACK_DATA,GET_COUNT_VERIFIED} from "./types";
import Swal from "sweetalert2";
import { BASE_URL } from "../../utilities/config";
import { GET_ALL_USERS } from "../certificates/types";
import { useNavigate } from "react-router-dom";

/* AXIOS INTERCEPTOR */
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 502) {
      window.location.href = "/service-unavailable";
    }
    if (err?.response?.status === 401) {
    }
    return Promise.reject(err);
  }
);

const devUrl = BASE_URL;


const errorHandle = () => {
      Swal.fire({
        icon: "error",
        title: "Session Expired!",
        text: "",
        confirmButtonText: "OK",
        confirmButtonColor: "#03596e",
      }).then(function () {
        window.location.replace("/admin");
      });
};



export const getCountCertificate = () => (dispatch) => {
  const API_URL = `${devUrl}ad/dash/getallcount`;  
  axios
    .get(API_URL,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((response) => {
      dispatch({ type: GET_COUNT_DATA, payload: response.data });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};

export const getstackholderDetail = () => (dispatch) => {
  const API_URL = `${devUrl}ad/dash/stakeholders`;  
  axios
    .get(API_URL,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((response) => {
      dispatch({ type: GET_STACK_DATA, payload: response.data });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};

export const getFirstGraphData = () => (dispatch) => {
  const API_URL = `${devUrl}ad/dash/sharecout`;  
  axios
    .get(API_URL,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((response) => {
      dispatch({ type: GET_FIRST_GRAPH_DATA, payload: response.data });
    })
    .catch((err) => {
    });
};


export const getGraphData = (data,data1) => (dispatch) => {
  const API_URL = `${devUrl}ad/dash/fetchcount`;  
  axios
    .get(API_URL,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((response) => {
      dispatch({ type: GET_GRAPH_DATA, payload: response.data });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};

export const getCountAll = () => (dispatch) => {
  const API_URL = `${devUrl}ad/dash/getcount`;  
  axios
    .get(API_URL,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((response) => {
      dispatch({ type: GET_COUNT_ADMIN, payload: response.data });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};

export const getVerifiedCount = () => (dispatch) => {
  const API_URL = `${devUrl}ad/dash/getverifiedcount`;  
  axios
    .get(API_URL,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((response) => {
      dispatch({ type: GET_COUNT_VERIFIED, payload: response.data });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};



export const getAllUserAdmin = () => (dispatch) => {
  const API_URL = `${devUrl}ad/dash/users`;  
  axios
    .get(API_URL,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((response) => {
      dispatch({ type: GET_ALL_USERS_ADMIN, payload: response.data });
    })
    .catch((err) => {
        if (err?.response?.status === 401) {
          errorHandle();
        }
    });
};

export const updateLogout = (dispatch) => {
  const body = { refreshToken: sessionStorage.getItem("refreshToken") };
  axios
    .post(devUrl + "/ad/logout", body)
    .then((res) => {
      Swal.fire("Session Expired").then(() => {
        window.location.href = "/admin";
      });
    })
    .catch((err) => {
      window.location.href = "/admin";
    });
};
