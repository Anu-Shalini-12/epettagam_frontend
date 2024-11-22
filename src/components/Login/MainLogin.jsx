import React, { useState, useEffect, ClipboardEvent } from "react";
import logo from "../../Assets/Mask_Group_1.png";
import "../../style/style.css";
import { useNavigate } from "react-router-dom";
import loginLog from "../../Assets/smallLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { MainLoginData } from "../store/certificates/action";
import Swal from "sweetalert2";
import tnlogo from "../../Assets/E logo  png.png";
import loader from "../../Assets/Rolling-1s-200px.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as CryptoJS from "crypto-js";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Banner from "../../Assets/Group 1401.png";
import Banner1 from "../../Assets/Group 1404.png";
import Banner2 from "../../Assets/Group 1405.png";
import Banner4 from "../../Assets/MicrosoftTeams-image (1).png";
import { IoMdRefresh } from "react-icons/io";
import { BASE_URL } from "../utilities/config";
import play from "../../Assets/google-play.svg";
import Scanner from "../../Assets/adobe_express.png";
import { useTranslation } from "react-i18next";

function MainLogin() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  let loginData = useSelector((store) => store.certificate.getLogin_res);
  let loginData_err = useSelector(
    (store) => store.certificate.getLogin_res_err
  );
  let bulkErr = useSelector((store) => store.certificate.get_bulk_err);
  const [Adhaar, setAdhar] = useState("");
  const [captchabox, setcaptchabox] = useState();
  const [captchas, setCaptchas] = useState();
  const [submitLoader, setSubmitLoader] = useState(false);
  const [captchaId, setCaptchaId] = useState();
  const [errors, setError] = useState({ Adhaar: "", captchas: "" });
  const [bulk, setBulk] = useState(false);
  const [consent, setConsent] = useState(false);
  const [dataLoop, setData] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.clear()
    window.addEventListener("popstate", () => {
      window.history.go(1);
    });

    axios
      .get(`${BASE_URL}captcha`, {
        credentials: "include",
      })
      .then((res) => {
        setcaptchabox(res.data.data.captcha);
        setCaptchaId(res.data.data.id);
      })
      .catch((err) => {
        if(err.response.data === undefined){
          navigate("/service-unavailable")
        }else{        
          Swal.fire({
            icon: "error",
            title: t("errCap"),
            text:
              err.response.data !== undefined ? err.response.data : err.message,
            confirmButtonText: "OK",
            confirmButtonColor: "#154272",
          });
        }
      });
  }, []);

  useEffect(() => {
    if (loginData_err !== "") {
      if (
        loginData_err?.response?.data?.message !== "Otp XSD Validation Failed."
      ) {
        Swal.fire({
          icon: "error",
          title: "",
          text: loginData_err?.response?.data?.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#154272",
        });
        setSubmitLoader(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "",
          text: t("valid"),
          confirmButtonText: "OK",
          confirmButtonColor: "#154272",
        });
        setSubmitLoader(false);
      }
    }
  }, [loginData_err]);


  if (bulkErr !== undefined && dataLoop === false) {
    setData(true);

    Swal.fire({
      icon: "error",
      title: "",
      text: t("bulkPull"),
      confirmButtonText: "OK",
      confirmButtonColor: "#154272",
    }).then(function () {
      window.location.reload();
    });
  }

  useEffect(() => {
    if (
      loginData.message ===
      "OTP sent successfully to the registered mobile number"
    ) {
      setSubmitLoader(false);
      sessionStorage.setItem("User_ID", loginData.id);
      sessionStorage.setItem("Consent", consent);
      const encryptconfigs = {
        key: "t700#zkrF@db0705",
        iv: "i700#zkrF@db0705",
      };

      var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
      var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
      var encryptedData = CryptoJS.AES.encrypt(Adhaar, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      encryptedData = encryptedData.toString();
      Swal.fire({
        icon: "success",
        title: "",
        text: t("sentOtp"),
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      });
      navigate("/Otp", {
        state: {
          adhar: encryptedData,
          bulk: bulk,
          captchId: captchaId,
          consent: consent,
        },
      });
    }
  }, [Adhaar, bulk, captchaId, consent, loginData, navigate]);

  const handleValidation = () => {
    // const errors = {};
    let formIsValid = true;
    if (Adhaar === undefined || Adhaar === "") {
      formIsValid = false;
      errors.Adhaar = "This is a required field";
    }
    if (captchas === undefined || captchas === "") {
      formIsValid = false;
      errors.captchas = "This is a required field";
    }

    setError({ errors });
    return formIsValid;
  };


  const SubmitHandler = () => {
    sessionStorage.setItem("otp","otp")
    const encryptconfigs = {
      key: "t700#zkrF@db0705",
      iv: "i700#zkrF@db0705",
    };

    var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
    var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
    var encryptedData = CryptoJS.AES.encrypt(Adhaar, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    encryptedData = encryptedData.toString();

    if (handleValidation()) {
      if (captchabox === captchas) {
        if (consent === true) {
          setSubmitLoader(true);
          const body = {
            aadharNo: encryptedData,
            aadharConsent: consent,
            captchaid: captchaId,
            captcha: captchabox,
          };
          dispatch(MainLoginData(body));
        } else {
          Swal.fire({
            icon: "error",
            title: "",
            text: t("givCons"),
            confirmButtonText: "OK",
            confirmButtonColor: "#154272",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: t("errCap"),
          text: t("invalid"),
          confirmButtonText: "OK",
          confirmButtonColor: "#154272",
        });
      }
    }
  };

  const changeConsent = () => {
    if (consent === false) {
      setConsent(true);
    } else {
      setConsent(false);
    }
  };

  const changeBulk = () => {
    if (bulk === false) {
      setBulk(true);
    } else {
      setBulk(false);
    }
  };
  const reloadFunc = () => {
    axios
      .get(`${BASE_URL}captcha`, {
        credentials: "include",
      })
      .then((res) => {
        setcaptchabox(res.data.data.captcha);
        setCaptchaId(res.data.data.id);
      })
      .catch((err) => {
        
          Swal.fire({
            icon: "error",
            title: t("errCap"),
            text:
              err.response.data !== undefined ? err.response.data : err.message,
            confirmButtonText: "OK",
          });
      });
  };

  const handleAdhar = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setAdhar(result);
  };

  const preventCopyPaste = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "error",
      title: "",
      text: t("pasting"),
      confirmButtonText: "OK",
    });
  };

  const handlePlayStore = () => {
    window.open(
      "https://play.google.com/apps/internaltest/4701141258703851346"
    );
  };

  return (
    <div style={{ width: "100%",overflowY:'hidden'}}>
      <ToastContainer />
      <div className="" id="contTop1" style={{ width: "100%" }}>
        <div id="boxes" 
        >
          <div id="bannerArea">
            <div style={{ height: "430px" }}>
              <Carousel
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
              >
                <div>
                  <div className="mt-4 ml-2" id="boxboard">
                    <div className="flex" style={{ marginLeft: "1px" }}>
                      <img alt="" src={logo} id="imgLogo" />
                      <p className="mt-4 font-bold dataTamil" id="enter" style={{fontSize:'20px'}}>
                        {t("tngovt")}
                      </p>
                    </div>
                    <div id="bannerState">
                      <p
                        id="enterSemi"
                        className=" textmain"
                        style={{ color: "#4A575F", fontSize: "18px" }}
                      >
                        {t("slide1content")}
                      </p>
                      <p
                        id="enterSemi"
                        className="text-xl"
                        style={{ color: "#4A575F" }}
                      ></p>
                    </div>
                  </div>
                  <img
                    alt=""
                    id="banner_img"
                    src={Banner}
                    style={{ width: "50%", height: "45%" }}
                  />
                </div>
                <div>
                  <div className="mt-4 ml-2" id="boxboard">
                    <div className="flex">
                      <img alt="" src={logo} id="imgLogo" />
                      <p
                        className="mt-4 text-2xl font-bold dataTamil"
                        id="enter" style={{fontSize:'20px'}}
                      >
                        {t("tngovt")}
                      </p>
                    </div>
                    <div id="bannerState">
                      <p
                        id="enterSemi"
                        className=" textmain"
                        style={{ color: "#4A575F", fontSize: "18px" }}
                      >
                        {t("slide1content")}
                      </p>
                      <p
                        id="enterSemi"
                        className="text-xl"
                        style={{ color: "#4A575F" }}
                      ></p>
                    </div>
                  </div>
                  <img
                    alt=""
                    id="banner_img"
                    src={Banner1}
                    style={{ width: "50%", height: "45%" }}
                  />
                </div>
                <div>
                  <div className="mt-4 ml-2" id="boxboard">
                    <div className="flex">
                      <img alt="" src={logo} id="imgLogo" />
                      <p
                        className="mt-4 text-2xl font-bold dataTamil"
                        id="enter" style={{fontSize:'20px'}}
                      >
                        {t("tngovt")}
                      </p>
                    </div>
                    <div id="bannerState">
                      <p
                        id="enterSemi"
                        className=" textmain"
                        style={{ color: "#4A575F", fontSize: "18px" }}
                      >
                        {t("EasySharing")}
                      </p>
                      <p
                        id="enterSemi"
                        className="text-lg"
                        style={{ color: "#4A575F" }}
                      ></p>
                    </div>
                  </div>
                  <img
                    alt=""
                    id="banner_img"
                    src={Banner2}
                    style={{ width: "42%", height: "45%" }}
                  />
                </div>
                <div>
                  <img
                    alt=""
                    id="banner_imglast"
                    src={Banner4}
                    style={{ width: "90%", height: "75%" }}
                  />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
        <div id="box1"  
        >
          <div
            className="p-2"
            id="cardbox"
            style={{
              boxShadow: "0px 3px 6px #00000029",
              borderBottom: "4px solid #4984CA",
              borderRadius: "11px",
            }}
          >
            <div className="flex">
              <img
                alt=""
                src={loginLog}
                style={{ width: "26px", marginLeft: "1%" }}
                className="mt-1"
              />
              <p
                className="mt-1 ml-4 font-bold"
                id="enter"
                style={{ color: "#292828D8", fontSize: "18px" }}
              >
                {t("title1")}
              </p>
            </div>
              <div className="flex flex-col mt-3 ml-5 ">
                <label id="enter" className="text-lg " style={{fontSize:'16px'}}>
                  {t("AadhaarEnter")}
                </label>
                <input
                  className="w-full mt-1 form-control"
                  maxLength="12"
                  style={{
                    height: "41px",
                    padding: "12px 20px",
                    boxSizing: "border-box",
                    resize: "none",
                    backgroundColor: "#F7FAFC",
                    borderRadius: "11px",
                    border: "none",
                    outline: "none",
                  }}
                  value={Adhaar}
                  placeholder={t("aadhar")}
                  onChange={handleAdhar}
                />
                {errors.Adhaar !== "" &&
                  errors.errors.Adhaar === "This is a required field" && (
                    <p className="text-xs " style={{ color: "red" }}>
                      {t("requiredField")}
                    </p>
                  )}
                <label
                  id="enter"
                  className="mx-2 mt-3 text-lg "
                  style={{ marginTop: "`1rem",fontSize:'16px' }}
                >
                  {t("Captcha")}
                </label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "2",
                  }}
                  className="gap-2 mt-1 d-flex flex-column justify-content-between align-items-center"
                >
                  <input
                    id="captchaInput"
                    onCopy={(e) => preventCopyPaste(e)}
                    className="mt-1 captcha-input d-flex flex-grow-1 form-control"
                    pointerEvents="box-only"
                    value={captchabox}
                    style={{
                      backgroundColor: "#F7FAFC",
                      border: "none",
                      height: "40px",
                      padding: "10px",
                      fontSize: "20px",
                      width: "100%",
                      borderRadius: "11px",
                      outline: "none",
                    }}
                    disabled
                  />
                  <div id="refresh" style={{ width: "fit-content",marginLeft:'84%'}}>
                    <IoMdRefresh
                      className="refresh-icon"
                      style={{ fontSize: "32px"}}
                      id="Refresh-option"
                      type="button"
                      onClick={reloadFunc}
                    />
                  </div>
                </div>
                <input
                  type="text"
                  className="w-full form-control"
                  style={{
                    height: "41px",
                    padding: "12px 20px",
                    boxSizing: "border-box",
                    resize: "none",
                    backgroundColor: "#F7FAFC",
                    borderRadius: "11px",
                    border: "none",
                    outline: "none",
                    marginTop: "2rem",
                  }}
                  value={captchas}
                  placeholder={t("Captcha1")}
                  onChange={(e) => setCaptchas(e.target.value)}
                />
                {errors.captchas !== "" &&
                  errors.errors.captchas === "This is a required field" && (
                    <p className="text-xs " style={{ color: "red" }}>
                      {t("requiredField")}
                    </p>
                  )}
                <div className="flex" style={{ marginTop: "1rem" }}>
                  <input
                    className=""
                    type="checkbox"
                    style={{ width: "20px", marginTop: "-25px" }}
                    onClick={changeBulk}
                  />
                  <img alt="" src={tnlogo} style={{ marginTop: "-10px" }} />
                  <p
                    style={{
                      marginTop: "1px",
                      fontFamily: "muliReg",
                      color: "#4A575F",
                      fontSize:'15px',
                    }}
                  >
                    {t("Prefetch")}
                  </p>
                </div>
                <div className="flex mt-2">
                  <input
                    className=""
                    type="checkbox"
                    style={{ width: "23px", marginTop: "2px" }}
                    onClick={changeConsent}
                  />
                  <p
                    className="ml-4"
                    style={{
                      marginTop: "0px",
                      fontFamily: "muliReg",
                      fontSize:'15px',
                      color: "#4A575F",
                    }}
                  >
                    {t("Authorized")}
                  </p>
                </div>
                <div className="flex mt-2" style={{ wordWrap: "break-word" }}>
                  <p
                    style={{
                      marginTop: "0px",
                      marginLeft: "9%",
                      fontSize:'15px',
                      fontFamily: "muliReg",
                      color: "#4A575F",
                      width: "94%",
                    }}
                  >
                    {t("Collecting")}
                  </p>
                </div>
                <div className="flex justify-end mt-10 mr-16" style={{marginBottom:'2rem'}}>
                  {submitLoader === false ? (
                    <button
                    onClick={() => SubmitHandler()}
                      style={{
                        outline: "none",
                        borderWidth: "0",
                        padding: "5px 30px",
                        borderRadius: "25px",
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: "#4984CA",
                      }}
                    >
                      {t("submit")}
                    </button>
                  ) : (
                    <>
                      <img alt="" src={loader} style={{ width: "50px" }} />
                    </>
                  )}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLogin;
