import React, { useState, useEffect } from "react";
import Card from "../component/UI/CardEsevai"; 
import ButtonFill from "../component/UI/ButtonFill";
import { useNavigate } from "react-router-dom";
import loginLog from "../../Assets/smallLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { LoginEsevai } from "../store/esevai/action";
import { Buffer } from "buffer";
import CaptchaTest from "./CaptchaTest";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { BsQuestionCircle } from "react-icons/bs";
import loaderimg from "../../Assets/Loading_2.gif"


function Esevai() {
  const { t, i18n } = useTranslation();
  let loginData = useSelector((store) => store.esevai.login_resp);
  let loginDataErr = useSelector((store) => store.esevai.action_login_err);
  let loginMainData = useSelector(
    (store) => store.certificate.otp_verification
  );
  const [adhar, setAdhar] = useState('');
  const [otp, setShowOtp] = useState(false);
  const [captcha, setCaptcha] = useState(undefined);
  const [capCode, setcapCode] = useState(undefined);
  const [firstData,setfirstData] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setError] = useState({ adhar: "" });
  const [loader,setLoader] = useState(false)

  const result = (text) => {
    setCaptcha(text); 
  };

  useEffect(()=>{
    if(loginDataErr !== undefined){
      setLoader(false)
    }
  },[loginDataErr])
 

  useEffect(() => {
    if (loginData.status === true) {
      if(firstData === true){
        const Id = adhar;
        setLoader(false)
        const baseAdhr = Buffer.from(Id).toString("base64");
        sessionStorage.setItem("esevai_adhar", baseAdhr);
        sessionStorage.setItem("esevai_id", loginData.id);
        sessionStorage.getItem("errorData","yes")
        navigate("/OurServices/esevai/otp", {
          state: { id: loginData.id, adhar: baseAdhr },
        });
      }
    }
  }, [adhar, loginData, navigate]);

 
  const handleValidation = () => {
    let formIsValid = true;
    if (adhar === undefined || adhar === "") {
      formIsValid = false;
      errors.adhar = "This is a required field";
    }

    setError({ errors });
    return formIsValid;
  };

  function LoginDataFuc(e) {
    e.preventDefault();
    if (handleValidation() === true) {
      setLoader(true)
      if (capCode !== undefined) {
        if (capCode === captcha) {
          const Id = adhar;
          const baseAdhr = Buffer.from(Id).toString("base64");
          sessionStorage.setItem("esevai_adhar", baseAdhr);
          const body = {
            aadharid: baseAdhr,
          };
          dispatch(LoginEsevai(body));
          setfirstData(true)
          setShowOtp(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Captcha does not match",
            text: '',
            confirmButtonText: "OK",
            confirmButtonColor: "#154272",
          });
          setLoader(false)
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Please enter captcha",
          text: '',
          confirmButtonText: "OK",
          confirmButtonColor: "#154272",
        });
        setLoader(false)
      }
    }
  }

  const setAdharNumber=(e)=>{    
      e.target.value = e.target.value.replace(/[^0-9]/gi, "");
      
      if(adhar.length <= 12){
        setAdhar(e.target.value)
      }
  }

  return (
    <div style={{width:'100%'}}>
      <div className=" m-4 p-2 ml-[40px]">
        <Card>
          <div>
            <div className="flex">
              <img alt='' src={loginLog} className="mt-1 w-9 mb-9 " />
              <p
                className="mt-4 ml-4"
                id="enter"
                style={{ color: "#292828D8", fontSize: "20px" }}
              >
                {t("title1")}
              </p>
            </div>

            <div className="justify-items-center">
              <form className="flex flex-col ml-4 ">
                <label className="mb-2" for="adhar" id="enter">
                  {t("aadhar")}:
                </label>
                
                <input
                  className="w-3/4 p-2 border rounded-lg bg-slate-200"
                  maxLength={12}
                  name="adhar"
                  id="adhar"
                  placeholder={t("aadhar")}
                  value={adhar}
                  onChange={(e) => setAdharNumber(e)}
                />
                {errors.adhar !== "" &&
                  errors.errors.adhar === "This is a required field" && (
                    <p className="text-xs" style={{ color: "red" }}>
                      {t("requiredField")}
                    </p>
                  )}
                <div className="gap-4 mt-4 d-flex">
                  <CaptchaTest getCaptchaValue={result} />
                </div>
                <label className="mt-4 mb-2" for="captha" id="enter">
                  {t("enterCaptcha")}:
                </label>
                <input
                  className="w-3/4 p-2 border rounded-lg bg-slate-200"
                  type="text"
                  name="captha"
                  id="captha"
                  placeholder={t("enterCaptcha")}
                  value={capCode}
                  onChange={(e) => setcapCode(e.target.value)}
                />
                <div className="mt-6 " style={{ width: "45%" }}>
                  {loader === false ?
                    <ButtonFill onClick={LoginDataFuc}>{t("submit")}</ButtonFill>
                  :
                    <img alt="" src={loaderimg} style={{width:'50px'}}/>
                  }
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
      <div style={{width:'80%',marginLeft:'10%',backgroundColor:'#FFF5EE',padding:'10px'}}>
          <span style={{display:'flex',color:'red'}}><BsQuestionCircle style={{color:'red',marginTop:'3px',marginRight:'5px'}}/> {t("disc")} </span>
          <span>{t("discTitle")}</span>
        </div>
    </div>
  );
}

export default Esevai;
