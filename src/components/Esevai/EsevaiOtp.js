import React, {useState,useEffect} from 'react'
import Card from '../component/UI/Card1'
import ButtonFill from '../component/UI/ButtonFill'
import { useNavigate, useLocation } from 'react-router-dom'
import loginLog from '../../Assets/smallLogo.png'
import { useSelector, useDispatch } from 'react-redux'
import { LoginEsevaiOTP ,LoginEsevai } from '../store/esevai/action';
import OtpInput from 'react-otp-input';
import Swal from 'sweetalert2'
import { invalid } from 'moment'
import { useTranslation } from "react-i18next";
import loaderimg from "../../Assets/Loading_2.gif"

function Esevai(props) {
  const { t, i18n } = useTranslation();
  let loginOtp = useSelector((store) => store.esevai.login_otp)  
  let loginOtpErr = useSelector((store) => store.esevai.login_otp_err)  
  let loginData = useSelector((store) => store.esevai.login_resp);
  const token = useSelector((store) => store.certificate.otp_verification)
  const store = useSelector((store) => store)
  const [firstdata,setFirstData] = useState(false)
  const location = useLocation()
  const [OTP, setOTP] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loader,setLoader] = useState(false)
  
  useEffect(()=>{
    if(loginOtpErr !== undefined){
      setLoader(false)
    }
  },[loginOtpErr])

  useEffect(() => { 

    if(sessionStorage.getItem("otp") !== null){
      if(loginOtpErr !== undefined){
        if(sessionStorage.getItem("errorData") == "yes"){          
            Swal.fire({
              icon: "error",
              title: " ",
              text: "invalid OTP",
              confirmButtonText: "OK",
              confirmButtonColor: "#154272",
          
            })
        }
      }
    }  
}, [loginOtpErr])



useEffect(()=>{
  if(sessionStorage.getItem("count") === "yes"){
    sessionStorage.setItem("count","No")
    navigate(-2)
  }
},[])


useEffect(() => { 
  sessionStorage.setItem('esevai_id',loginData.id)
}, [loginData])

  useEffect(() => {  
    if(sessionStorage.getItem("otp") !== null){
      if(loginData !== undefined){
        if(sessionStorage.getItem("count") === 2){  
          Swal.fire({
            icon: "success",
            title: " ",
            text: "Otp sent to your registered mobile number",
            confirmButtonText: "OK",
            confirmButtonColor: "#154272",
        
          })
        }
      }
    }
    
  }, [loginData])

  useEffect(() => { 
    if(loginOtp.status === true) {
      if(firstdata == true){
        setLoader(false)
        sessionStorage.setItem('auth_esevai_id',loginOtp.data.authid)
        Swal.fire({
          icon: "success",
          title: " Aadhar authentication successful",
          text: loginOtp.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#154272",
      
        }).then (function() {
          sessionStorage.setItem("count","yes")
          navigate('/OurServices/esevai/addDocument',{state:{id:location.state.adhar}})
          
        });
      }
    }

    if(sessionStorage.getItem("otp") !== null){
      if(loginOtp.status === false){
        if(sessionStorage.getItem("count") !== "yes"){
          Swal.fire({
            icon: "error",
            title: "",
            text: "Invalid OTP",
            confirmButtonText: "OK",
            confirmButtonColor: "#154272",
        
          })
        }
      }
    }
  }, [firstdata, location?.state?.adhar, loginOtp, navigate])



  function OtpSubmit(event){
    event.preventDefault();
    if(OTP !== ''){
      setLoader(true)
      const body={
        aadharid: location.state.adhar,
        otp: OTP,
        id: sessionStorage.getItem('esevai_id')
      }
      sessionStorage.getItem("errorData","no")
      dispatch(LoginEsevaiOTP(body))
      setFirstData(true)
    }else{
      Swal.fire({
        icon: "error",
        title: "",
        text:"Please enter the OTP",
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      });
      setLoader(false)
    }
  }

  const handleChange = (otp) => {
    setOTP(otp)
  }


  const handleResend=()=>{
    const body = {
      aadharid: sessionStorage.getItem("esevai_adhar")
    };
    dispatch(LoginEsevai(body));
  }
  return (
    <div className="w-2/4 m-4 p-10 ml-[40px]">
      <Card>
        <div>
          <div className="flex">
            <img alt='' src={loginLog}  className="mt-4 w-9 mb-9 "/>
            <p className="mt-4 ml-4" id="enter" style={{color:'#292828D8',fontSize:"20px"}}>{t("title1")}</p>
          </div>
          <form onSubmit={OtpSubmit}>
          <div className="flex flex-col mb-10 ml-20 space-y-8" style={{marginLeft:'6%'}}>
                  <div className="flex font-bold" id="enter">
                    {t("OtpMobile")}
                  </div>
       

                <OtpInput
                  value={OTP}
                  onChange={handleChange}
                  numInputs={6}
                  separator={<span>{` - `}</span>}
                  inputStyle={{
                    border: "1px solid black",
                    margin: "6px",
                    borderRadius: "4px",
                    width: "30px",
                    height: "40px",
                    backgroundColor: "#4984CA43",
                  }}
                />

        
        <div className="flex justify-center mr-10 ">
          {loader === false ?
            <ButtonFill >{t("submit")}</ButtonFill> 
            :
                    <img alt="" src={loaderimg} style={{width:'50px'}}/>
                  }
        </div>
      </div>
      </form>
      <div className="flex font-bold text-theme-blue">
          <button id="enterSemi" style={{color:'black'}}>{t("didnrecv")} <sapn style={{color:'#3498db'}} onClick={handleResend}>{t("resend")}</sapn></button>
        </div>
        </div>
      </Card>
    </div>
  )
}

export default Esevai
