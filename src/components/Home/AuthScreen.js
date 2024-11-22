import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import loader from "../../Assets/c7e1b7b5753737039e1bdbda578132b8.gif"
import Url from "url";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Swal from "sweetalert2";
// import { navigate } from "@reach/router";

function Home() {
  const navigate= useNavigate()
  const { t, i18n } = useTranslation();
  const queryParams = Url.parse(window.location.href, true).query;
  const [failed,setFailed] = useState(false)
  const [firstData, setFirstData] = useState (true)

  useEffect(() => {
    if(firstData === true){
      axios.get('https://www.epettagam.tn.gov.in/wallet/user/auth/usertoken?authtoken='+queryParams.token)
      .then((res)=>{
        setFirstData(false)
        sessionStorage.setItem("User_ID",res.data.data.userid)
        sessionStorage.setItem("username",res.data.data.username)
        sessionStorage.setItem("dob",res.data.data.dob)
        sessionStorage.setItem("refreshToken",res.data.data.refreshToken)
        sessionStorage.setItem("authtoken",res.data.data.token)
        navigate('/OurServices/')

      })
      .catch((err)=>{
        setFirstData(false)
        setFailed(true)
        if(err.response.status == 401){
          
          Swal.fire({
            icon: "error",
            title: "",
            text: err.response.data.message,
            confirmButtonText: "OK",
            confirmButtonColor: "#154272",
          }).then(function () {
            navigate('/')
          });
        }
      })
    }
    
  }, [navigate, queryParams])
  
  return (
    <div className="w-full">
      {failed === false ?
        <div>
          <center><img alt="" src={loader} style={{width:'500px'}}/></center>
          <center>Redirecting to E-pettagam......</center>
        </div>
      :
      <div className="mt-5">
        <center><p style={{fontSize:'25px',color:'red',fontWeight:'500'}}>Failed to redirect E-pettagam......</p></center>
      </div>
      }
    </div>
  );
}
export default Home;
