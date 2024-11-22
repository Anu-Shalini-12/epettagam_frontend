import React ,{useEffect}from "react";
import { Outlet, useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { HiDocumentText } from "react-icons/hi";
import { BsFillInfoCircleFill, BsFillShieldLockFill } from "react-icons/bs";
import background from "../../Assets/Nambikkai iniyam logo1.png";
import { IoIosHelpCircle } from "react-icons/io";
import pdfFile from '../../Assets/privacyPolicies.pdf'
import { Document, Page } from "react-pdf";
import MaModalContact from '../../components/component/MaModalContact'
import pdfFile1 from '../../Assets/aboutUs.pdf'
import { useTranslation } from "react-i18next";

function Sidebar(props) {
  const { t, i18n } = useTranslation();
  const [handlePopUP,setPopUp] = React.useState(false)
  const [handleabout,setAbout] = React.useState(false)
  const [newData,setNew] = React.useState(false)
  const path = useLocation();
  const url = path.pathname.split("/");



  useEffect(() => {
    if(newData == false){
      setNew(true)
      if(sessionStorage.getItem("authtoken") == null){
        navigate('/')
        
      }
    }
  },[])


  const navigate = useNavigate();
  const Pageredirect = (data) => {
    sessionStorage.setItem("seachD","no")
    // props.handleSearch() 
    if (data == "OurServices") {
      navigate("/OurServices");
    } else if (data == "MyDocument") {
      navigate({ pathname: "/MyDocument", state: { data: "data" } });
    }
  };


  const handlePrivacyPolicy=()=>{
    setPopUp(!handlePopUP)
  }

  const handleAbout=()=>{
    setAbout(!handleabout)
  }
  
  return (
    <div className="flex h-full h-100">
      <div
        className="hidden h-screen md:block w-80"
        style={{
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          boxShadow: "0px 3px 6px #00000029",
        }}
      >
        <div className="relative w-full mt-16">
          <div
            style={{
              backgroundColor: url[1] === "OurServices" ? "#144272" : "",
              marginBottom: "20px",
            }}
          >
            <a
              href
              onClick={() => Pageredirect("OurServices")}
              className="ml-12 font-bold cursor-pointer"
              style={{
                lineHeight: "50px",
                display: "flex",
                fontSize:'81%',
                marginLeft:'7%',
                color: url[1] === "OurServices" ? "white" : "black",
              }}
            >
              {" "}
              <AiOutlineHome
                style={{
                  marginTop: "15px",
                  fontSize: "132%",
                  marginRight: "10px",
                  color: url[1] === "OurServices" ? "white" : "black",
                }}
              />
              {t("service")}
            </a>
          </div>
          <div
            style={{
              backgroundColor: url[1] === "MyDocument" ? "#144272" : "",
              marginBottom: "20px",
            }}
          >
            <a
              href
              onClick={() => Pageredirect("MyDocument")}
              className="ml-12 font-bold cursor-pointer"
              style={{
                lineHeight: "50px",
                display: "flex",
                fontSize:'81%',
                marginLeft:'7%',
                color: url[1] === "MyDocument" ? "white" : "black",
              }}
            >
              <HiDocumentText
                style={{
                  marginTop: "15px",
                  fontSize: "132%",
                  marginRight: "10px",
                  color: url[1] === "MyDocument" ? "white" : "black",
                }}
              />
              {t("wallet")}
            </a>
          </div>
          <div
            style={{
              backgroundColor: url[1] === "" ? "#144272" : "",
              marginBottom: "20px",
            }}
          >
            <a onClick={handlePrivacyPolicy}
              href
              className="ml-12 font-bold cursor-pointer"
              style={{
                lineHeight: "50px",
                display: "flex",
                fontSize:'81%',
                marginLeft:'7%',
                color: url[1] === "" ? "white" : "black",
              }}
            >
              <BsFillShieldLockFill
                style={{
                  marginTop: "15px",
                  fontSize: "132%",
                  marginRight: "10px",
                  color: url[1] === "" ? "white" : "black",
                }}
              />
              {t("privacy")}
            </a>
          </div>

          <div
            style={{
              backgroundColor: url[1] === "" ? "#144272" : "",
              marginBottom: "20px",
            }}
          >
            <a
              href
              // onClick={() => Pageredirect("MyDocument")}
              onClick={handleAbout}
              className="ml-12 font-bold cursor-pointer"
              style={{
                lineHeight: "50px",
                display: "flex",
                fontSize:'81%',
                marginLeft:'7%',
                color: url[1] === "" ? "white" : "black",
              }}
            >
              <BsFillInfoCircleFill
                style={{
                  marginTop: "15px",
                  fontSize: "132%",
                  marginRight: "10px",
                  color: url[1] === "" ? "white" : "black",
                }}
              />
              {t("about")}
            </a>
          </div>
        </div>

        <img alt=""
          src={background}
          style={{ position: "relative", top: "-20px", right: "120px" }}
        />
      </div>
      <MaModalContact
          open={handlePopUP}
          onClose={handlePrivacyPolicy}
        >
          <div
            style={{
              padding: "20px",

              // overflowY: "scroll",
              maxHeight: "600px",
            }}
          >
            <div
              style={{
                marginLeft: "93%",
                fontWeight: "bold",
                fontSize: "25px",
                cursor: "pointer",
              }}
            >
              <a onClick={handlePrivacyPolicy}>X</a>
            </div>
            <div
              style={{
                marginLeft: "42%",
              }}
            >
              <h3 style={{ color: "#377D22", fontWeight: "bold" }}>Privacy Policy</h3>
            </div>
            <div
              className="d-flex justify-content-center"
              style={{
                overflowY: "scroll",
                maxHeight: "500px",
              }}
            >
              <iframe
                style={{ display: "block", width: "100%", height: "90vh" }}
                title="PdfFrame"
                src={pdfFile}
                frameborder="0"
                type="application/pdf"
              ></iframe>
            </div>
          </div>
        </MaModalContact>
      <MaModalContact
          open={handleabout}
          onClose={handleAbout}
        >
          <div
            style={{
              padding: "20px",

              // overflowY: "scroll",
              maxHeight: "600px",
            }}
          >
            <div
              style={{
                marginLeft: "93%",
                fontWeight: "bold",
                fontSize: "25px",
                cursor: "pointer",
              }}
            >
              <a onClick={handleAbout}>X</a>
            </div>
            <div
              style={{
                marginLeft: "42%",
              }}
            >
              <h3 style={{ color: "#377D22", fontWeight: "bold" }}>About Us</h3>
            </div>
            <div
              className="d-flex justify-content-center"
              style={{
                // border: "1px solid red",
                overflowY: "scroll",
                maxHeight: "500px",
              }}
            >
              <Document file={pdfFile1}>
                <Page pageNumber={1} />
              </Document>
            </div>
          </div>
        </MaModalContact>
    </div>
  );
}

export default Sidebar;
