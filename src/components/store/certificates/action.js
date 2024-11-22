import {
  GET_ALL_USERS,
  GET_ALL_BLOCKED_USERS,
  GET_TOTAL_USER_COUNT,
  BLOCK_USER,
  BLOCK_USER_ERR,
  GET_CERTIFICATE,
  GENERATE_OTP_ERR,
  GET_ALL_ZONE,
  GENERATE_OTP,
  VERIFY_OTP,
  SET_ROUTING_NAME,
  MAIN_LOGIN_DATA,
  RESEND_OTP_ERR,
  RESEND_OTP,
  MAIN_LOGIN_DATA_ERR,
  GET_ALL_DMECERT,
  GET_CERTIFICATE_ERR,
  GET_REVOKE_USERS,
  OTP_VERIFY,
  OTP_VERIFY_ERR,
  LOGOUT_DATA,
  LOGOUT_DATA_ERR,
  GET_DIGI_LOCKER,
  GET_DIGI_LOCKER_ERR,
  GET_ALL_EDUCERT,
  GET_ALL_SEVCERT,
  GET_CERTIFICATE_XML,
  GET_BULK_PULL,
  GET_BULK_PULL_ERR,
  GET_LOGIN_CONSENT,
  GET_ALL_DISTRICT,
  GET_ALL_SRO,
} from "./types";
import axios from "axios";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
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

const DEV_URL = BASE_URL;



export const postSroApi = (data) => (dispatch) => {
  const API_URL = `${DEV_URL}rg/reg_sro?district=${data}`;
  axios
    .get(API_URL, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      dispatch({ type: GET_ALL_SRO, payload: response });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};

export const postDistrictApi = (data) => (dispatch) => {
  const API_URL = `${DEV_URL}rg/reg_dist?zone=${data}`;
  axios
    .get(API_URL, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      dispatch({ type: GET_ALL_DISTRICT, payload: response });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};


export const postZoneApi = (data,data1) => (dispatch) => {
  const API_URL = `${DEV_URL}rg/reg_zone`;
  axios
    .get(API_URL, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      dispatch({ type: GET_ALL_ZONE, payload: response });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};



export const adminConcurrency = () => {
  const data = {
    refreshToken: sessionStorage.getItem("refreshToken"),
  };
  axios
    .post(DEV_URL + `ad/token`, data)
    .then((res) => {
      sessionStorage.setItem("authtoken", res.data.data.token);
      sessionStorage.setItem("refreshToken", res.data.data.refreshToken);
      window.location.reload();
    })
    .catch((err) => {
      const data = {
        refreshToken: sessionStorage.getItem("refreshToken"),
      };
      axios.post(DEV_URL + "ad/logout", data).then((res) => {
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "",
          confirmButtonText: "OK",
          confirmButtonColor: "#154272",
        }).then(function () {
          window.location.href = "/admin";
        });
      });
    });
};

export const getAllUsers = (data,data1) => (dispatch) => {
  const API_URL = `${DEV_URL}ad/dash/users?pageNo=${data}&size=${data1}`;
  axios
    .get(API_URL, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      dispatch({ type: GET_ALL_USERS, payload: response });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};

export const getRevokedUsers = () => (dispatch) => {
  const API_URL = `${DEV_URL}ad/dash/get_revoked_users`;
  axios
    .get(API_URL, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      dispatch({ type: GET_REVOKE_USERS, payload: response });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};

export const getAllBlockedUsers = (data,data1) => (dispatch) => {
  const API_URL = `${DEV_URL}ad/dash/get_blocked_users?pageNo=${data}&size=${data1}`;
  axios
    .get(API_URL, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      dispatch({ type: GET_ALL_BLOCKED_USERS, payload: response });
    })
    .catch((err) => {
      dispatch({ type: BLOCK_USER_ERR, payload: err });
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};

export const getTotalNumberUsers = () => (dispatch) => {
  const API_URL = `${DEV_URL}ad/dash/get_counts`;
  axios
    .get(API_URL, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    })
    .then((res) => res.data)
    .then((response) => {
      dispatch({ type: GET_TOTAL_USER_COUNT, payload: response });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};

export const blockUser = (id,data) => (dispatch) => {
  let API_URL=''
  if(data == 'block'){
    API_URL = `${DEV_URL}ad/dash/blockuser`;
  }else{
    API_URL = `${DEV_URL}ad/dash/approveuser`;
  }
  axios
    .post(
      API_URL,
      { id: id },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("authToken"),
        },
      }
    )
    .then((res) => res.data)
    .then((response) => {
      dispatch({ type: BLOCK_USER, payload: response });
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        errorHandle();
      }
    });
};

export const setRoutingName = (data) => (dispatch) => {
  if (data !== "") dispatch({ type: SET_ROUTING_NAME, payload: data });
};

export const GetCertificateDetails = (dept, body) => (dispatch) => {
  axios
    .post(DEV_URL + `edu/` + dept + `/getcerts`, body, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: GET_CERTIFICATE, payload: res });
    })
    .catch((err) => {
      dispatch({ type: GET_CERTIFICATE_ERR, payload: err });
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
            axios.post(DEV_URL + "user/logout", data).then((res) => {
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

export const GetCertificateXml = (dept, body, data) => (dispatch) => {
  axios
    .post(DEV_URL + `edu/` + dept + `/getcerts`, body, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: GET_CERTIFICATE_XML, payload: res });
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
            axios.post(DEV_URL + "user/logout", data).then((res) => {
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

export const MainLoginData = (body) => (dispatch) => {
  axios
    .post(DEV_URL + `user/login`, body)
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: MAIN_LOGIN_DATA, payload: res });
    })
    .catch((err) => {
      dispatch({ type: MAIN_LOGIN_DATA_ERR, payload: err });
      
    });
};

export const otpVerify = (body) => (dispatch) => {
  axios
    .post(DEV_URL + `user/verifyotp`, body)
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: OTP_VERIFY, payload: res });
    })
    .catch((err) => {
      dispatch({ type: OTP_VERIFY_ERR, payload: err });
      if (err?.response?.status === 401) {
        const data = {
          makkalid: sessionStorage.user,
          refreshToken: sessionStorage.refreshToken,
        };
        axios
          .post(DEV_URL + `user/token`, data)
          .then((res) => {
            sessionStorage.setItem("authorization", res.data.token);
            sessionStorage.setItem("refreshToken", res.data.refreshToken);
          })
          .catch((err) => {
            const data = {
              refreshToken: sessionStorage.getItem("refreshToken"),
            };
            axios.post(DEV_URL + "user/logout", data).then((res) => {
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
          title: "",
          text: "Invalid OTP",
          confirmButtonText: "OK",
        });
      }
    });
};

export const ResendOTP = (body) => (dispatch) => {
  axios
    .post(DEV_URL + `user/resendotp`, body)
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      sessionStorage.setItem("User_ID", res.id);
      Swal.fire({
        icon: "success",
        title: "",
        text: "Otp resent to your registered mobile number",
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      });

      dispatch({ type: RESEND_OTP, payload: res });
    })
    .catch((err) => {
      dispatch({ type: RESEND_OTP_ERR, payload: err });
      if (err?.response?.status === 401) {
        const data = {
          makkalid: sessionStorage.user,
          refreshToken: sessionStorage.refreshToken,
        };
        axios
          .post(DEV_URL + `user/token`, data)
          .then((res) => {
            sessionStorage.setItem("authorization", res.data.token);
            sessionStorage.setItem("refreshToken", res.data.refreshToken);
          })
          .catch((err) => {
            const data = {
              refreshToken: sessionStorage.getItem("refreshToken"),
            };
            axios.post(DEV_URL + "user/logout", data).then((res) => {
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

export const getEduCert = (data) => (dispatch) => {
  axios
    .get(DEV_URL + `wallet/escert/getewalletcert`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: GET_ALL_EDUCERT, payload: res });
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
            axios.post(DEV_URL + "user/logout", data).then((res) => {
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

export const getDmecert = (data) => (dispatch) => {
  axios
    .get(DEV_URL + `dme/wallet/getcert`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: GET_ALL_DMECERT, payload: res });
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
            axios.post(DEV_URL + "user/logout", data).then((res) => {
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

export const getSevCert = (data) => (dispatch) => {
  axios
    .get(DEV_URL + `wallet/sbcert/getsbwalletcert`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: GET_ALL_SEVCERT, payload: res });
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

            axios.post(DEV_URL + "user/logout", data).then((res) => {
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
export const getBulkPull = (data) => (dispatch) => {
  axios
    .post(DEV_URL + `esevai/add`, data, {
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
        title:
          "Login Successful, " + " esevai certificates linked with the aadhar",
        confirmButtonText: "OK",
      });
      dispatch({ type: GET_BULK_PULL, payload: res });
    })
    .catch((err) => {
      dispatch({ type: GET_BULK_PULL_ERR, payload: err });
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

export const getConsentApi = (data) => (dispatch) => {
  axios
    .post(DEV_URL + `user/con/userconsent`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: GET_LOGIN_CONSENT, payload: res });
    })
    .catch((err) => {
      Swal.fire({
        icon: "warning",
        title: err.response.data.message,
        confirmButtonText: "OK",
      });
      dispatch({ type: GET_BULK_PULL_ERR, payload: err });
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

export const digiLocker = (data) => (dispatch) => {
  axios
    .post(DEV_URL + `edu/digisync`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: GET_DIGI_LOCKER, payload: res });
      Swal.fire({
        icon: "success",
        title: "",
        text: "Sync with DigiLocker, successfully",
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      });
    })
    .catch((err) => {
      dispatch({ type: GET_DIGI_LOCKER_ERR, payload: err });
      Swal.fire({
        icon: "error",
        title: "",
        text: err.response.data.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      }).then(function () {
        window.location.href = "/";
      });
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
            axios.post(DEV_URL + "user/logout", data).then((res) => {
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

export const logOutData = () => (dispatch) => {
  const data = {
    makkalid: sessionStorage.getItem("user"),
    refreshToken: sessionStorage.getItem("refreshToken"),
  };
  axios
    .post(DEV_URL + `user/logout`, data)
    .then((response) => {
      return response.data;
    })
    .then((res) => {
      dispatch({ type: LOGOUT_DATA, payload: res });
    })
    .catch((err) => {
      dispatch({ type: LOGOUT_DATA_ERR, payload: err });
    });
};

export const user_login = (email, pswd) => (dispatch) => {
  const API_URL = `${DEV_URL}ad/login`;

  const body = {
    email: email,
    password: pswd,
  };

  axios
    .post(API_URL, body)
    .then((response) => {
      dispatch({ type: GENERATE_OTP, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: GENERATE_OTP_ERR, payload: err });
    });
};

export const verify_otp_func = (email, otp) => (dispatch) => {
  const API_URL = `${DEV_URL}ad/verifyotp`;

  const body = {
    email: email,
    otp: otp,
  };

  axios
    .post(API_URL, body)
    .then((response) => {
      sessionStorage.setItem("authToken", response.data.user.token);
      sessionStorage.setItem("refreshToken", response.data.user.refreshToken);
      dispatch({ type: VERIFY_OTP, payload: response.data });
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "OTP Error",
        text: err.response.data.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      });
    });
};
