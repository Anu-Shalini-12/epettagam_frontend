import React,{useEffect} from "react";
import Card from "../component/UI/Card";
import ButtonOutline from "../component/UI/ButtonOutline";
import {
  Link,
  useNavigate
} from "react-router-dom";
import logoEdu from "../../Assets/Mask_Group_1.png";
import logoSevai from "../../Assets/TNeGA_logo.png";
import { useSelector, useDispatch } from "react-redux";
import syn from "../../Assets/path0.svg";
import synclogo from "../../Assets/cloud-sync-icon.png";
import { digiLocker } from "../store/certificates/action";
import Url from "url";
import { useTranslation } from "react-i18next";
// import { navigate } from "@reach/router";

function Home() {
  const navigate= useNavigate()
  const { t, i18n } = useTranslation();
  const queryParams = Url.parse(window.location.href, true).query;
  const [digitime,setdigitime] = React.useState(0)
  sessionStorage.removeItem("esevai_id");
  const dispatch = useDispatch();
  let loginData = useSelector((store) => store.certificate.otp_verification);
  const [newData,setNew] = React.useState(false)
 

  if (queryParams.code !== undefined) {
    const body = {
      code: queryParams.code,
      clientid: "8707FE8F",
    };
    if(digitime === 0){
      setdigitime(1)
      dispatch(digiLocker(body));
    }
  }

  const menuList = [
    {
      menuName: (t("education")),
      image: logoEdu,
      options: [
        (t("Higher_Education")),
        (t("Diploma_Certificate")),
        (t("School_Education")),
        (t("Skills_Certificate")),
      ],
      link: "/OurServices/eCertificates",
    },
    {
      menuName: (t("tngovtcert")),
      image: logoSevai,
      options: [
        (t("Income")),
        (t("Nativity")),
        (t("First_Graduation")),
        (t("OBC_Certificates")),
      ],
      link: "/OurServices/esevai",
    },
  ];

  const handleSync = () => {
    window.location.href=
      "https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=8707FE8F&redirect_uri=https://www.epettagam.tn.gov.in/OurServices/&state=1234 76FF"
    
  };
  const handleSession=()=>{
    sessionStorage.setItem("open","no")
    sessionStorage.setItem("seachD","no")
  }

  return (
    <div className="w-full">
      <p
        style={{
          color: "#D98521",
          marginLeft: "20px",
          marginTop: "1rem",
          fontWeight: "500",
        }}
      >
        {t("wecome")}{sessionStorage.getItem("username")}
      </p>
      <h3
        style={{
          fontSize: "23px",
          marginLeft: "20px",
          marginTop: "0rem",
          fontWeight: "bold",
        }}
      >
        {t("service")}
      </h3>
      <div
        className="w-4/5 grid-cols-2 gap-10 mt-2 "
        id="ServBox"
        style={{ marginLeft: "7%" }}
      >
        {menuList.map((menu, index) => {
          return (
            <div
              className="grid w-full"
              key={index} id="underDiv"
              style={{marginLeft: index === 1 ? '70px' : "",marginTop:index === 2 ? '-60px' : ''}}
            >
              <Link onClick={handleSession} to={menu.link}>
                <Card key={index}>
                  <div className="flex font-bold" style={{ marginLeft: "5%" }}>
                    <img
                      alt=""
                      src={menu.image}
                      style={{ width: "50px", height: "50px" }}
                    /> 
                    <p
                      className="mt-2"
                      id="enter"
                      style={{ color: "#292828D8" }}
                    >
                      {menu.menuName} 
                    </p>
                  </div>
                  <div className="mx-auto">
                    <ul className="grid grid-cols-2 gap-3 mt-4">
                      {menu.options.map((opt, index) => {
                        return (
                          <li
                            className="list-disc"
                            style={{ color: "blue", lineHeight: "50px",marginTop:'-2rem' }}
                            key={index}
                          >
                            <p
                              className=""
                              style={{ color: "#292828D8" }}
                              id="enterReg"
                            >
                              {opt}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="flex justify-end">
                    <ButtonOutline>{t("Add_New")}</ButtonOutline>
                  </div>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>

      <div
        className="w-4/5 grid-cols-2 gap-10 "
        id="ServBox1"
        style={{ marginLeft: "7%" }}
      >
        {menuList.map((menu, index) => {
          return (
            <div
              className="grid w-full"
              key={index} id={index === 1 ? "underDiv1" : "underDiv" }
              style={{marginTop: index === 1 || 2 ? '-1rem' : "",marginBottom: index === 1 ? '1rem' : ""}}
            >
              <Link to={menu.link}>
                <Card key={index}>
                  <div className="flex font-bold" style={{ marginLeft: "5%" }}>
                    <img
                      alt=""
                      src={menu.image}
                      style={{ width: "50px", height: "50px" }}
                    />
                    <p
                      className="mt-2"
                      id="enter"
                      style={{ color: "#292828D8"}}
                    >
                      {menu.menuName}
                    </p>
                  </div>
                  <div className="mx-auto">
                    <ul className="gap-3 mt-4 ">
                      {menu.options.map((opt, index) => {
                        return (
                          <li
                            className="list-disc"
                            style={{ color: "blue", lineHeight: "50px" }}
                            key={index}
                          >
                            <p
                              className=""
                              style={{ color: "#292828D8",}}
                              id="enterReg"
                            >
                              {opt}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="flex justify-end">
                    <ButtonOutline>{t("Add_New")}</ButtonOutline>
                  </div>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        <div id="syncDigiData"
         
        >
          <Link to="https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=8707FE8F&redirect_uri=https://www.epettagam.tn.gov.in/OurServices/&state=1234 76FF">
          <a
            // onClick={handleSync}
            href
            style={{ cursor: "pointer" }}
            target="_blank"
          >
            <div
              style={{
                display: "flex",
                border: "2px solid #F4F2FC",
                backgroundColor: "#F4F2FC",
                boxShadow: "0px 3px 6px #0000001D",
              }}
            >
              <img
                alt=""
                src={synclogo}
                style={{ width: "30px", height: "30px", marginTop: "7px" ,marginLeft:'11%'}}
              />
              <p
                style={{
                  marginLeft: "6%",
                  fontWeight: "bold",
                  marginTop: "7px",
                  fontSize:'13px'
                }}
              >
                {t("sync")}
              </p>
              <img alt=''
                src={syn}
                width={100}
                style={{ marginLeft: "3%", marginTop: "-22px" }}
              />
            </div>
          </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;
