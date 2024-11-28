import React, { useState ,useEffect} from "react";
import logo from "../../Assets/Mask_Group_1.png";
import "../../style/style.css";
import { useNavigate } from "react-router-dom";
import loginLog from "../../Assets/smallLogo.png";
import { useSelector, useDispatch } from "react-redux"; 
import {
  otpVerify,
  getBulkPull,
  ResendOTP,
} from "../store/certificates/action";
import axios from "axios";
import Swal from "sweetalert2";
import OtpInput from "react-otp-input";
import * as CryptoJS from "crypto-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loader from "../../Assets/Rolling-1s-200px.gif";
import { useTranslation } from "react-i18next";


function Otp() { debugger;
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  let otpVerification = useSelector(
    (store) => store.certificate.otp_verification
  );
  let otpErr = useSelector((store) => store.certificate.otp_verification_err)
  let bulkPull = useSelector((store) => store.certificate.get_bulkPull);
  let bulkErr = useSelector((store) => store.certificate.get_bulk_err);
 
  const [otp, setOtp] = useState("");
  const [dataloop, setdataloop] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [consentLoop,setconsentLoop] = useState(true)
  const dispatch = useDispatch();
  const [firstClick,setFirstClick] = useState(false)


  useEffect(() => {
    setSubmitLoader(false)
  }, [otpErr]);

  useEffect(()=>{
    if(sessionStorage.getItem("otp") == null){
      navigate('/')
    }
  },[])
  let userData = window.history;
 

  if (bulkPull !== undefined) {
    if (bulkPull.status === true) {
      const data = "";
      Swal.fire({
        icon: "success",
        title: "",
        text: (t("logSucc")) ,
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      }).then(()=>{
        window.location.href=(`/OurServices/${data}`);
      })
    } else {
    }
  }
  if (bulkErr !== undefined) {
    const data = "";
    Swal.fire({
      icon: "success",
      title: "",
      text: "Login Successful ," + bulkErr.response.data.message ,
      confirmButtonText: "OK",
      confirmButtonColor: "#154272",
    }).then(()=>{
      window.location.href=(`/OurServices/${data}`);
    })
    // window.location.href=(`/OurServices/${data}`);
  }

  if (otpVerification !== undefined && dataloop === false) {
    sessionStorage.setItem("authtoken", otpVerification.data.token);
    sessionStorage.setItem("authtoken", otpVerification.data.token);

    if (otpVerification.status === true && consentLoop === true) {
      sessionStorage.setItem("refreshToken", otpVerification.data.refreshToken);
      sessionStorage.setItem("username", otpVerification.data.username);
      sessionStorage.setItem("dob", otpVerification.data.dob);
      sessionStorage.setItem("user", otpVerification.data.makkalid);

      if (userData.state.usr.consent === true && consentLoop === true) {
        const encryptconfigs = {
          key: "t700#zkrF@db0705",
          iv: "i700#zkrF@db0705",
        };

        var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
        var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
        var encryptedUserID = CryptoJS.AES.encrypt(
          otpVerification.data.userid,
          key,
          {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          }
        );
        encryptedUserID = encryptedUserID.toString();

        const bodyConsent = {
          userid: encryptedUserID,
          certificatetype: userData.state.usr.adhar,
        };
        // const data = "";
        // navigate(`/OurServices/${data}`);
        axios
          .post(
            "https://www.epettagam.tn.gov.in/wallet/user/con/userconsent",
            bodyConsent,
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
              },
            }
          )
          .then((res) => {
            if (userData.state.usr.bulk === true) {
              const encryptconfigs = {
                key: "t700#zkrF@db0705",
                iv: "i700#zkrF@db0705",
              };

              var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
              var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
              var encryptedData = CryptoJS.AES.encrypt(
                otpVerification.data.makkalid,
                key,
                {
                  iv: iv,
                  mode: CryptoJS.mode.CBC,
                  padding: CryptoJS.pad.Pkcs7,
                }
              );

              encryptedData = encryptedData.toString();
              const body = {
                aadharno: userData.state.usr.adhar,
              };

              dispatch(getBulkPull(body));
              setdataloop(true);
              setconsentLoop(false)
              setSubmitLoader(false);
              
            } else {
              const data = "";
              setdataloop(true);
              setSubmitLoader(false)
              Swal.fire({
                icon: "success",
                title: "",
                text: (t("logSucc")) ,
                confirmButtonText: "OK",
                confirmButtonColor: "#154272",
              }).then(()=>{
                window.location.href=(`/OurServices/${data}`);
              })
            }
          })
          .catch((err) => {
            setSubmitLoader(false);
            setconsentLoop(false)
            // Swal.fire({
            //   icon: "error" ,
            //   title: "",
            //   text: (t("trylog")) ,
            //   confirmButtonText: "OK",
            //   confirmButtonColor: "#154272",
            // })
          });
      }
    }
  }

  const SubmitHandler = (event) => {
    event.preventDefault();
      if(otp.length === 6){
        setSubmitLoader(true);
        const encryptconfigs = {
          key: "t700#zkrF@db0705",
          iv: "i700#zkrF@db0705",
        };

        var key = CryptoJS.enc.Latin1.parse(encryptconfigs.key);
        var iv = CryptoJS.enc.Latin1.parse(encryptconfigs.iv);
        var encryptedData = CryptoJS.AES.encrypt(otp, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });

        encryptedData = encryptedData.toString();

        var encryptedId = CryptoJS.AES.encrypt(
          sessionStorage.getItem("User_ID"),
          key,
          {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          }
        );

        encryptedId = encryptedId.toString();
        const body = {
          aadharNo: userData.state.usr.adhar,
          otp: encryptedData,
          id: encryptedId,
          aadharConsent: sessionStorage.getItem("Consent"),
        };
        dispatch(otpVerify(body));
      }else{
        Swal.fire({
            icon: "warning" ,
            title: "",
            text: "Please Enter valid OTP" ,
            confirmButtonText: "OK",
            confirmButtonColor: "#154272",
          })
      }
  };

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const handleResend = () => {

    setFirstClick(false)
    const body = {
      aadharNo: userData.state.usr.adhar,
      aadharConsent: true,
    };
    dispatch(ResendOTP(body));
  };

 
  return (
    <div style={{ width: "100%" }}>
      <ToastContainer />
      <div
        className="" id="contTop1" style={{width:'100%'}} 
      
      >
        <div id='boxesOTP'>
          <div className="" id="boxes1" >
            <div className="flex">
              <img alt='' src={logo} style={{ width: "82px" }} />
              <p className="mt-1 ml-6 text-xl font-bold" id="enter">
                {t("tngovtcert")}
              </p>
            </div>
            <div
              style={{ marginLeft: "13%", marginTop: "1rem", width: "78%" }}
            >
              <p
                id="enterSemi"
                className="text-xl textmain"
                style={{ color: "#4A575F", fontSize: "18px" }}
              >
                {t("GetAllCert")}
              </p>
              <p
                id="enterSemi"
                className="text-xl textmain"
                style={{ color: "#4A575F", fontSize: "18px" }}
              >
               {t("AddIt")}
              </p>
              <p
                id="enterSemi"
                className="text-xl textmain"
                style={{ color: "#4A575F", fontSize: "18px" }}
              >
                {" "}
                {t("ShareandDownload")}
              </p>
              <p
                id="enterSemi"
                className="text-xl textmain"
                style={{ color: "#4A575F" }}
              ></p>
            </div>
          </div>
        </div>
        <div id="box1OTP">
          <div
            className="p-4" id
            style={{
              marginTop: "-1%",
              width: "87%",
              marginLeft: "2%",
              height: "100%",
              boxShadow: "0px 3px 6px #00000029",
              borderRadius: "11px",
              border: "none",
              outline: "none",
              borderBottom: "4px solid #4984CA",
            }}
          >
            <div className="flex">
              <img
                alt=""
                src={loginLog}
                style={{ width: "35px", marginLeft: "9%" }}
                className="mt-4"
              />
              <p
                className="mt-4 ml-4"
                id="enter"
                style={{ color: "#292828D8", fontSize: "20px" }}
              >
                {t("title1")}
              </p>
            </div>
            <form onSubmit={SubmitHandler}>
              <div className="flex flex-col p-4 ">
                <label id="enter" style={{ fontSize: "15px" }}>
                  {t("OtpMobile")}
                </label>
                    <div
                      style={{
                        marginTop: "30px",
                        marginBottom: "30px",
                        marginLeft:'-1rem'
                      }}
                    >
                      <OtpInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={6}
                        separator={<span>{` - `}</span>}
                        renderInput={(props) => <input {...props} />}
                        inputStyle={{
                          border: "1px solid #4984CA",
                          margin: "6px",
                          borderRadius: "4px",
                          width: "30px",
                          height: "40px",
                          backgroundColor: "#4984CA43",
                        }}
                      />
                    </div>
                    
                    <div className="flex justify-end mr-16">
                      {submitLoader === false ? (
                        <button
                          style={{
                            // border: "2px solid #144272",
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

                        // <input type="submit" />
                      ) : (
                        <img alt="" src={loader} style={{ width: "50px" }} />
                      )}
                    </div>
              </div>
            </form>

            <p
                    className="font-bold"
                    style={{ color: "black", fontWeight: "500" }}
                  >
                    {t("didnrecv")}{" "}
                    <span
                      style={{ color: "#144272", cursor: "pointer" }}
                      onClick={handleResend}
                    >
                      {t("resend")}
                    </span>
                  </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
