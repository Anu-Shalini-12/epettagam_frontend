import {
  GET_ALL_SERVICES,
  LOGIN_ACTION,
  GET_CERTIFICATE,
  CERT_DATA,
  LOGIN_OTP,
  LOGIN_OTP_ERR,
  SHARE_CERT,
  LOGIN_ACTION_ERR,
} from "./types";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../utilities/config";

/* AXIOS INTERCEPTOR */
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 502) {
      window.location.href = "/service-unavailable"; 
    }
    if (err?.response?.status === 401) {
      // sessionStorage.clear();
      // alert("Session Expired");
      // window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

const API_URL = `${BASE_URL}esevai/`;
const DEV_URL = BASE_URL;



export const GetAllServices = (data) => (dispatch) => {
  axios
    .get(API_URL + `getServices?token=` + data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: GET_ALL_SERVICES, payload: res.data });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        const data = {
          refreshToken: sessionStorage.getItem("refreshToken"),
        };
        axios
          .post(DEV_URL + `user/token`, data)
          .then((res) => {
            sessionStorage.setItem("authtoken", res.data.data.token);
            sessionStorage.setItem("refreshToken", res.data.data.refreshToken);
            window.location.reload();
          })
          .catch((err) => {
            const data = {
              refreshToken: sessionStorage.getItem("refreshToken"),
            };
            axios.post(DEV_URL + "/user/logout", data).then((res) => {
              Swal.fire({
                icon: "warning",
                title: "Session Expired",
                text: "",
                confirmButtonText: "OK",
                confirmButtonColor: "#154272",
              }).then(function () {
                window.location.href = "/";
              });
            });
          });
      }
    });
};

export const LoginEsevai = (data) => (dispatch) => {
  axios
    .post(API_URL + `generateotp`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: "",
        text: "The otp has been sent to your registered mobile number",
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      })
      dispatch({ type: LOGIN_ACTION, payload: res });
    })
    .catch((err) => {
      
      dispatch({ type: LOGIN_ACTION_ERR, payload: err });
      if (err?.response?.status === 401) {
        const data = {
          refreshToken: sessionStorage.getItem("refreshToken"),
        };
        axios
          .post(DEV_URL + `user/token`, data)
          .then((res) => {
            sessionStorage.setItem("authtoken", res.data.data.token);
            sessionStorage.setItem("refreshToken", res.data.data.refreshToken);
            window.location.reload();
          })
          .catch((err) => {
            const data = {
              refreshToken: sessionStorage.getItem("refreshToken"),
            };
            axios.post(DEV_URL + "/user/logout", data).then((res) => {
              Swal.fire({
                icon: "warning",
                title: "Session Expired",
                text: "",
                confirmButtonText: "OK",
                confirmButtonColor: "#154272",
              }).then(function () {
                window.location.href = "/";
              });
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Error!",
          text:
            err?.response?.data !== undefined
              ? err?.response?.data?.message
              : "",
          confirmButtonText: "OK",
        });
      }
    });
};

export const LoginEsevaiOTP = (data) => (dispatch) => {
  axios
    .post(API_URL + `verifyotp`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response;
    })
    .then((res) => {

      dispatch({ type: LOGIN_OTP, payload: res.data });
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "",
        text:"Invalid OTP",
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      });
      dispatch({ type: LOGIN_OTP_ERR, payload: err });
      if (err?.response?.status === 401) {
        const data = {
          refreshToken: sessionStorage.getItem("refreshToken"),
        };
        axios
          .post(DEV_URL + `user/token`, data)
          .then((res) => {
            sessionStorage.setItem("authtoken", res.data.data.token);
            sessionStorage.setItem("refreshToken", res.data.data.refreshToken);
            window.location.reload();
          })
          .catch((err) => {
            const data = {
              refreshToken: sessionStorage.getItem("refreshToken"),
            };
            axios.post(DEV_URL + "/user/logout", data).then((res) => {
              Swal.fire({
                icon: "warning",
                title: "Session Expired",
                text: "",
                confirmButtonText: "OK",
                confirmButtonColor: "#154272",
              }).then(function () {
                window.location.href = "/";
              });
            });
          });
      }
    });
};
export const getCertificates = (data) => (dispatch) => {
  axios
    .post(API_URL + `getcertificatesbyservice`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: GET_CERTIFICATE, payload: res.data });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        const data = {
          refreshToken: sessionStorage.getItem("refreshToken"),
        };
        axios
          .post(DEV_URL + `user/token`, data)
          .then((res) => {
            sessionStorage.setItem("authtoken", res.data.data.token);
            sessionStorage.setItem("refreshToken", res.data.data.refreshToken);
            window.location.reload();
          })
          .catch((err) => {
            const data = {
              refreshToken: sessionStorage.getItem("refreshToken"),
            };
            axios.post(DEV_URL + "/user/logout", data).then((res) => {
              Swal.fire({
                icon: "warning",
                title: "Session Expired",
                text: "",
                confirmButtonText: "OK",
                confirmButtonColor: "#154272",
              }).then(function () {
                window.location.href = "/";
              });
            });
          });
      }
    });
};

export const getCertData = (body, data) => (dispatch) => {
  axios
    .post(API_URL + `getcertificatedata`, body, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: CERT_DATA, payload: res.data });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        const data = {
          refreshToken: sessionStorage.getItem("refreshToken"),
        };
        axios
          .post(DEV_URL + `user/token`, data)
          .then((res) => {
            sessionStorage.setItem("authtoken", res.data.data.token);
            sessionStorage.setItem("refreshToken", res.data.data.refreshToken);
            window.location.reload();
          })
          .catch((err) => {
            const data = {
              refreshToken: sessionStorage.getItem("refreshToken"),
            };
            axios.post(DEV_URL + "/user/logout", data).then((res) => {
              Swal.fire({
                icon: "warning",
                title: "Session Expired",
                text: "",
                confirmButtonText: "OK",
                confirmButtonColor: "#154272",
              }).then(function () {
                window.location.href = "/";
              });
            });
          });
      }
    });
};

export const shareCertificate = (body) => (dispatch) => {
  var data = undefined;
  if (body.rollno !== undefined) {
    data = "sbcert";
  } else {
    data = "escert";
  }
  axios
    .post(DEV_URL + "wallet/" + data + "/share", body, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: res.message,
        text: "",
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      });
      dispatch({ type: SHARE_CERT, payload: res.data });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        const data = {
          refreshToken: sessionStorage.getItem("refreshToken"),
        };
        axios
          .post(DEV_URL + `user/token`, data)
          .then((res) => {
            sessionStorage.setItem("authtoken", res.data.data.token);
            sessionStorage.setItem("refreshToken", res.data.data.refreshToken);
            window.location.reload();
          })
          .catch((err) => {
            const data = {
              refreshToken: sessionStorage.getItem("refreshToken"),
            };
            axios.post(DEV_URL + "/user/logout", data).then((res) => {
              Swal.fire({
                icon: "warning",
                title: "Session Expired",
                text: "",
                confirmButtonText: "OK",
                confirmButtonColor: "#154272",
              }).then(function () {
                window.location.href = "/";
              });
            });
          });
      }
    });
};
