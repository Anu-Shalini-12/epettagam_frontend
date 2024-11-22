import React, { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../Assets/Mask_Group_1.png";
import "../../style/style.css";
import "react-responsive-modal/styles.css";
// import { Modal } from "react-responsive-modal";
import Modal from "../Modal/Modal"
import { Document, Page } from "react-pdf";
import play from "../../Assets/google-play.svg";
import Scanner from "../../Assets/adobe_express.png";
import samplePDF from "../../Assets/privacyPolicies (1).pdf";
import { useTranslation } from "react-i18next";
import { HiMenu } from "react-icons/hi";

function LoginHeader() { 
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [mobileMenu,setmenu] = useState(false)
  const [drop,setDrop] = useState(false)
  const [menu,setMenu] = useState(false)
  const [lang,setLanguage] = useState(false)
  const [language,setLang] = useState(sessionStorage.getItem("language"))

  useEffect(() => {
    localStorage.clear()    
  }, [])

  const redirection = () => {
    window.location.href = "/";
  };

  const handlePlayStore = () => {
    window.open(
      "https://play.google.com/apps/internaltest/4701141258703851346"
    );
  };

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
    setLang(event.target.value)
  };

  const handleHumMenu=()=>{
    setMenu(!menu)
  }

  const handleLng=()=>{
    setLanguage(!lang)
  }

  const languageChanges=(data)=>{
    sessionStorage.setItem("language", data);
    i18n.changeLanguage(data);
    setMenu(false)
    setLanguage(false)
  }

  return (
    <div className="Area">
      <Modal open={open} onClose={onCloseModal} center>

        <center>
          <a href onClick={onCloseModal} style={{fontSize:'30px',fontWeight:'bold',color:'black',marginBottom:'2rem',cursor:'pointer'}}>X</a>
        </center>
        <iframe
          style={{ display: "block", width: "100%", height: "90vh" }}
          title="PdfFrame"
          src={samplePDF}
          frameborder="0"
          type="application/pdf"
        ></iframe>
      </Modal>
      <div className="flex px-4 py-2 headerLayer d-flex align-items-center">
        <img
          alt=""
          src={logo}
          className="mt-1"
          style={{ width: "50px", height: "50px" }}
        />
        <p className="ml-2 font-bold text-white" id="logoTitle">
          {t("title")}
        </p>

        <img
          id="signInButton"
          onClick={handlePlayStore}
          style={{ width: "30px", cursor: "pointer" }}
          src={play}
          alt=""
        />
        <img
          style={{
            width: "30px",
            height: "30px",
            marginTop: "0px",
            marginLeft: "2%",
          }}
          src={Scanner}
          alt=""
        />
        <div
          class="dropdown"
          id="dropsystem5"
          style={{}}
        >
          <HiMenu style={{color:'white',fontSize:'30px'}} onClick={handleHumMenu}/>
        </div> 
        <a
          id="SeenPrivacy"
          href
          className="ml-2 mr-5 font-bold text-white"
          onClick={onOpenModal}
          style={{ cursor: "pointer", marginLeft: "2%" }}
        >
          {t("privacy")}
        </a>
        <select
          value={language}
          onChange={changeLanguage}
          id="desktopuser"
          style={{
            height: "35px",
            marginTop: "-3px",
            backgroundColor: "#154272",
            color: "white",
            fontWeight: "bold",
            width: "100px",
          }}
        >
          <option value="en">English</option>
          <option value="tamil">தமிழ்</option>
        </select>
      </div>
        {menu === true &&
          <div style={{position:'absolute',backgroundColor:'#154272',padding:'10px',marginRight:'-4%',width:'50%',marginLeft:'55%',marginTop:'0px',zIndex:'1'}}>
            <a onClick={onOpenModal} href style={{color:'white',fontWeight:'bold'}}>{t("privacy")}</a><br/><br/>
            <a onClick={handleLng} href style={{color:'white',fontWeight:'bold'}}>Language</a><br/><br/>
            {lang === true &&
              <a href style={{color:'white',fontWeight:'bold'}} 
              onClick={()=>languageChanges("en")}>English <br/><br/></a>
            }
            {lang === true &&
              <a href style={{color:'white',fontWeight:'bold'}} 
              onClick={()=>languageChanges("tamil")}>தமிழ்</a>
            }
          </div>
        } 
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default LoginHeader;
