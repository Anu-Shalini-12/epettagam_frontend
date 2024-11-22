import React, {useState,useEffect,useRef} from "react";
import "../../style/components/header.css"
import { useNavigate } from 'react-router-dom'
import SideBar from "./Sidebar"
import { Outlet, useParams, useLocation } from "react-router-dom";
import logo from "../../Assets/Mask_Group_1.png";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AiOutlineHome,AiOutlineSearch} from "react-icons/ai";
import loader from "../../Assets/Rolling-1s-200px.gif"
import { ImCross } from "react-icons/im";
import user from "../../Assets/Group 1 (1).png";
import { MdDeleteForever,MdArrowDropDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logOutData } from ".././store/certificates/action";
import { confirm } from "react-confirm-box"; 
import { BASE_URL } from "../utilities/config";
import { HiMenuAlt2 } from "react-icons/hi";
import Swal from "sweetalert2";
import pdfFile from '../../Assets/privacyPolicies.pdf'
import { Document, Page } from "react-pdf";
import MaModalContact from '../../components/component/MaModalContact'
import pdfFile1 from '../../Assets/aboutUs.pdf'


function Header(props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [searchLoader, setSearchLoader] = useState(false)
  const [searchVal,setSearchVal] = useState('')
  const [searchResult,setResult] = useState(undefined)
  const [notFound,setFound] = useState(false)
  const [styleclass,setStyleClass] = useState(false)
  const [searchbox,setSearchbox] = useState(false)
  const [handleabout,setAbout] = React.useState(false)
  const [handlePopUP,setPopUp] = React.useState(false)
  const [langSetup,setlangSetup] = useState(false)
  


  const handleSearchApi=()=>{
    setSearchLoader(true)
    axios.get("https://www.epettagam.tn.gov.in/wallet/wallet/search/"+searchVal,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    }).then((res)=>{
      if(res.data?.data?.result.length !==0){
        setResult(res.data?.data?.result[0])
        setFound(false)
        setSearchLoader(false)
      }else{
        setFound(true)
        setResult(undefined)
        setSearchLoader(false)
      }
    }).catch((err)=>{
      setSearchLoader(false)
    }) 
  }

  const handleSearchData=(e)=>{
    setSearchVal(e.target.value)
    setSearchLoader(true)
    // if(searchVal.length !== 0){
      sessionStorage.setItem("seachD","yes")
      axios.get("https://www.epettagam.tn.gov.in/wallet/wallet/search/"+e.target.value,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
        },
      }).then((res)=>{
        setSearchLoader(false)
        if(res.data?.data?.result.length !==0){
          setResult(res.data?.data?.result[0])
          setFound(false)
          setSearchLoader(false)
        }else{
          setFound(true)
          setResult(undefined)
          setSearchLoader(false)
        }
      }).catch((err)=>{
        setSearchLoader(false)
        setSearchLoader(false)
      })
    // }
  }

  const handleCrossSearch=()=>{
    setSearchVal('')
    setResult(undefined)
    setFound(false)
  }

  const logoutdata = () => {
    navigate('/')

    // dispatch(logOutData());
  };

  const onClick = async () => {

    setlangSetup(false)
    const result = await confirm(t("confirmdelete"));
    if (result) {
      
      axios
        .delete(`${BASE_URL}user/revoke`, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "",
            text: (t("deleSucc")),
            confirmButtonText: "OK",
            confirmButtonColor: "#154272",
          }).then(function () {
            window.location.reload();
            window.location.href = "/";
          });
        })
        .catch((err) => {
        });
      return;
    }
  };


  const languageChanges=(data)=>{
    setStyleClass(false)
    sessionStorage.setItem("language", data);
    i18n.changeLanguage(data);
  }
  

  const openNav=()=>{
    setStyleClass(!styleclass)
  }

  const handleToRedirectSearchResult=()=>{
    sessionStorage.setItem("SearchValue",searchVal)
    setSearchbox(false)
    
    navigate("/Document/Certificate",{state:{searchResult:searchResult}}); 
    window.location.reload()

    setFound(false)
  }

  const handleSearch=()=>{
    setSearchbox(!searchbox)
    setResult(undefined)
    setSearchVal('')
    
  }

  const Pageredirect = (data) => {
    setStyleClass(false)
    setlangSetup(false)
    if (data == "OurServices") {
      navigate("/OurServices");
      window.location.reload()
    } else {
      navigate("/MyDocument");
      window.location.reload()
      // navigate({ pathname: "/MyDocument", state: { data: "data" } });
    }
  };

  const handlePrivacyPolicy=()=>{
    setPopUp(!handlePopUP)
    setlangSetup(false)
    setStyleClass(false)
  }

  const handleAbout=()=>{
    setAbout(!handleabout)
    setlangSetup(false)
    setStyleClass(false)
  }

  const handleLanguage=()=>{
    setlangSetup(!langSetup)
  }

  return (
    <div >
      <nav class="navbar">
          <div id="logoArea" class="logo">
            <div className="flex" >
                    <img alt="" src={logo} style={{width:'28%',marginTop:'-3px'}} id="logoHeader" />
                    <p
                      className="ml-3 font-bold text-white "
                      style={{ fontSize: "18px", marginTop: "7px" }}
                    >
                      {t("title1")}
                    </p>
                  </div>
            </div>
            <div className="nav-links">
            <div>
              <div class="menu-wrap">
                <ul class="menu">
                    <li class="menu-item">
                      <AiOutlineSearch onClick={handleSearchApi} style={{fontSize:'25px',marginTop:'30%',marginRight:'7px',color:'white',cursor:'pointer'}}/>
                        <ul class="drop-menu">
                            <li class="drop-menu-item">
                              <div className="rounded" style={{display:'flex',backgroundColor:'#ffffff',padding:'2px',marginRight:'12px',marginTop:'5px'}}>
                                {searchLoader == false ? 
                                  <AiOutlineSearch onClick={handleSearchApi} style={{fontSize:'25px',marginTop:'1%',marginRight:'7px',color:'grey',cursor:'pointer'}}/> 
                                :  
                                  <img src={loader} alt="" style={{width:'30px'}}/>
                                }
                                <input type="text" value={searchVal} onChange={handleSearchData} placeholder="Search for certificates in the wallet" className="rounded" style={{color:'black',height:'30px',width:'80%',padding:"10px",outline:'none',marginTop:'0%',marginRight:'20px'}}/> 
                                
                                <ImCross style={{fontSize:'15px',marginTop:'2%',marginRight:'7px',color:'grey',cursor:'pointer'}} onClick={handleSearch}/>  
                              </div>
                            </li>
                            {searchResult !== undefined && notFound === false && searchVal !== '' &&
                            <li>
                                <div>
                                  <label className="mt-2">Result:</label>
                                  <div className="p-2 mt-2 rounded row" onClick={handleToRedirectSearchResult} style={{backgroundColor:'lightgray',cursor:'pointer',marginLeft:'0px'}}>
                                    <div className="col-12" ><p style={{color:'#154272',fontWeight:'bold',fontSize:'15px'}}>{searchResult?.rollno} {searchResult !== false && searchResult?.certificatedata['CERTIFICATENO']}</p></div>
                                    <div className="col-12 "><p style={{color:'#154272',fontWeight:'600',fontSize:'15px',textTransform:'capitalize'}}>{searchResult?.course} {searchResult !== false && searchResult?.certificatedata['SERVICE NAME']}</p></div>
                                  </div>
                                </div>
                            </li>
                            }
                        </ul>
                    </li>
                </ul>
              </div>
            </div>
            <div>
              <p
                className="mt-2 mr-5 font-bold"
                id="username"
                style={{ fontSize: "15px" }}
              >
                {sessionStorage.getItem("username")}
              </p>
            </div>
            <div>
              <div class="menu-wrap">
                <ul class="menu">
                    <li class="menu-item">
                        <a href="#" style={{fontSize:'25px',display:'flex'}}>
                          <img
                            alt=""
                            src={user}
                            className="mt-0"
                            id="userlogo"
                            style={{ width: "29px", height: "29px" }}
                          />
                          <MdArrowDropDown 
                              id="desktopuser" 
                            style={{
                                height: "35px",
                                // marginLeft: "22px",
                                marginTop:'-5px',
                                backgroundColor: "#154272",
                                color: "white",
                                fontWeight: "bold",
                                outline:'none',
                                width: "20px",
                              }}/>
                        </a>
                        <ul class="drop-menu">
                            <li class="drop-menu-item" style={{cursor:'pointer'}}>
                            <a onClick={onClick} >Delete my account</a>
                            </li>
                            <li class="drop-menu-item" style={{cursor:'pointer'}}>
                            <a onClick={logoutdata}>Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
              </div>
            </div>
            <div>
              <div class="menu-wrap">
                <ul class="menu">
                    <li class="menu-item">
                        <a href="#" style={{fontSize:'25px',display:'flex'}}>
                        <p
                            className="mt-1 mr-5 font-bold"
                            id="username"
                            style={{ fontSize: "15px" }}
                          >
                            Language
                          </p>
                          <MdArrowDropDown 
                              id="desktopuser" 
                            style={{
                                height: "35px",
                                // marginLeft: "22px",
                                marginTop:'-5px',
                                backgroundColor: "#154272",
                                color: "white",
                                fontWeight: "bold",
                                outline:'none',
                                width: "20px",
                              }}/>
                        </a>
                        <ul class="drop-menu">
                            <li class="drop-menu-item" style={{cursor:'pointer'}}>
                            <a onClick={()=>languageChanges("en")}>English</a>
                            </li>
                            <li class="drop-menu-item" style={{cursor:'pointer'}}>
                            <a onClick={()=>languageChanges("tamil")}>தமிழ்</a>
                            </li>
                        </ul>
                    </li>
                </ul>
              </div>
            </div>
            <div>
              <p
                className="mt-2 mr-5 font-bold"
                id="username"
                style={{ fontSize: "15px",width:'80px'}}
              >
                
              </p>
            </div>
          </div>
        <div id={styleclass  == false ? "myNav" : "myNav1"} class="overlay">
            <a href class="closebtn" onClick={openNav}>&times;</a>
            <div className="ml-2 row w-75" style={{marginTop:'8%'}}>
              <div className="rounded" style={{display:'flex',backgroundColor:'#ffffff',padding:'2px',marginRight:'12px',marginTop:'5px'}}>
                {searchLoader == false ? 
                  <AiOutlineSearch onClick={handleSearchApi} style={{fontSize:'25px',marginTop:'1%',marginRight:'7px',color:'grey',cursor:'pointer'}}/> 
                :  
                  <img src={loader} alt="" style={{width:'30px'}}/>
                }
                <input type="text" value={searchVal} onChange={handleSearchData} placeholder="Search" className="rounded" style={{color:'black',height:'30px',width:'80%',padding:"10px",outline:'none',marginTop:'0%',marginRight:'20px'}}/> 
                
                <ImCross style={{fontSize:'15px',marginTop:'2%',marginRight:'7px',color:'grey',cursor:'pointer'}} onClick={handleSearch}/>  
              </div>
              {searchResult !== undefined && notFound === false && searchVal !== '' &&
                            <li>
                                <div>
                                  <label className="mt-2">Result:</label>
                                  <div className="p-2 mt-2 rounded row" onClick={handleToRedirectSearchResult} style={{backgroundColor:'lightgray',cursor:'pointer',marginLeft:'0px'}}>
                                    <div className="col-12" ><p style={{color:'#154272',fontWeight:'bold',fontSize:'15px'}}>{searchResult?.rollno} {searchResult !== false && searchResult?.certificatedata['CERTIFICATENO']}</p></div>
                                    <div className="col-12 "><p style={{color:'#154272',fontWeight:'600',fontSize:'15px',textTransform:'capitalize'}}>{searchResult?.course} {searchResult !== false && searchResult?.certificatedata['SERVICE NAME']}</p></div>
                                  </div>
                                </div>
                            </li>
                            }
            </div>
            <div class="overlay-content">
              <center>
              <a href>Hi, {sessionStorage.getItem("username")}</a>
              <a href onClick={() => Pageredirect("OurServices")} >Our Services</a>
              <a href onClick={() => Pageredirect("MyDocument")}>My Document</a>
              <a href onClick={handleAbout}>About Us</a>
              <a href onClick={handlePrivacyPolicy}>Privacy Policy</a>
              <a href onClick={handleLanguage}>Language</a>
              {langSetup == true &&
                <a>
                  <a href onClick={()=>languageChanges("en")}>English</a>
                  <a href onClick={()=>languageChanges("tamil")}>தமிழ்</a>
                </a>
              }
              <a href onClick={onClick}>Delete my account</a>
              <a href onClick={logoutdata}>Logout</a>
              </center>
            </div>
          </div>
          <div id="humburger" style={{fontSize:'30px',cursor:'pointer',width:'100%'}} onClick={()=>openNav()}><HiMenuAlt2/> 
            <span style={{display:'flex',marginLeft:'2%'}}>
              <img alt="" src={logo} style={{width:'23%',marginTop:'3px'}} id="logoHeader" />
                    <p
                      className="ml-3 font-bold text-white "
                      style={{ fontSize: "18px", marginTop: "7px" }}
                    >
                      {t("title1")}
                    </p>
            </span>
          </div>
        
      </nav>
      <div className="row w-100"  style={{overflowX:'hidden'}}>
        <div className="bg-white col-md-2" id="sideMenu"> 
          <SideBar />
        </div>
        <div className="bg-white col-md-10">
        <Outlet />
        </div>
      </div>
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
                // border: "1px solid red",
                overflowY: "scroll",
                maxHeight: "500px",
              }}
            >
              <Document file={pdfFile}>
                <Page pageNumber={1} />
              </Document>
            </div>
          </div>
        </MaModalContact>

    </div>

  );
}

export default Header;
