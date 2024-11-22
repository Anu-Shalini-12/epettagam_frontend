import React, { useState } from "react";
import "../../style/style.css";
import axios from "axios";
import Swal from "sweetalert2";
import OtpInput from "react-otp-input";
import "react-toastify/dist/ReactToastify.css";


function ForgotpasswordScreen() {
 
  const [otp, setOtp] = useState("");

  const handleChange = (otp) => {
    setOtp(otp);
  };

  const handleVerify=()=>{
    const body={
      email : sessionStorage.getItem("email"),
      otp : otp
    }
    axios.post('https://www.epettagam.tn.gov.in/wallet/ad/verifyresetotp',body)
    .then((res)=> {
      sessionStorage.setItem("passToken", res.data.data.token)
      Swal.fire({
        icon: "success",
        title: "",
        text: "Otp verified successfully",
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      })
      window.location.href=('/admin/reset-password')
    }).catch((err)=>{
      Swal.fire({
        icon: "error",
        title: "",
        text: "Invalid OTP",
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      })
  })
  }

  const handleResend=()=>{
    const body={
      email: sessionStorage.getItem("email")
    }

    axios.post('https://www.epettagam.tn.gov.in/wallet/ad/forgotpassword',body)
    .then((res)=> {
      Swal.fire({
        icon: "success",
        title: "",
        text: "Otp resent to your registered emailId",
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      })
    }).catch((err)=>{})
  }

  return (
    <div>
      <div className="" style={{marginTop:'40%'}}>
        <center>
          <label>Enter OTP</label>
        </center>
        <div style={{marginLeft:'28%',marginTop:'30px'}}>
            <OtpInput
                  value={otp}
                  onChange={handleChange}
                  numInputs={6}
                  separator={<span>{` - `}</span>}
                  inputStyle={{
                    border: "1px solid #4984CA",
                    margin: "6px",
                    borderRadius: "4px",
                    width: "30px",
                    height: "40px",
                    backgroundColor: "#4984CA43",
                  }}
                />
                <a href onClick={handleResend} style={{marginTop:'20px',color:'#03596e',fontWeight:'bold',cursor:'pointer'}}>Resend OTP?</a>
        </div>
        <center>
          <button onClick={handleVerify} style={{marginTop:'30px',backgroundColor:'#03596e'}}>Verify</button>
        </center>
      </div>
    </div>
  );
}

export default ForgotpasswordScreen;
