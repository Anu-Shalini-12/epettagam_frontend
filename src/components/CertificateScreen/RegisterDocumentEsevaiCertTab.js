import React, { useState, useEffect } from "react";
import ModalData from "../Modal/Modal";
import "../../style/components/certificate.css"
import ModalData1 from "../Modal/Modal1";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate , useLocation} from "react-router-dom";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import ButtonFill from "../component/UI/ButtonFill";
import { getCertData, getCertificates } from "../store/esevai/action";
import axios from "axios";
import Swal from "sweetalert2";
import loaderimg from "../../Assets/Loading_2.gif"
import { Buffer } from "buffer";
import { BASE_URL } from "../utilities/config";
import loading from "../../Assets/Loading_2.gif";
import { useTranslation } from "react-i18next";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Document, Page } from "react-pdf";

const UpdateModal = () => {
  const { t, i18n } = useTranslation();
  const [open] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const services = useSelector((store) => store.esevai);
  let getCert = useSelector((store) => store.esevai.get_certificate)
  let loginData = useSelector((store) => store.certificate.otp_verification);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedData] = useState(0);
  const [repeatloop, setrepeatloop] = useState(0);
  const [selctValue, setselctValue] = useState("");
  const [pdfUrlData, setpdfData] = useState(undefined);
  const [consent, setconsent] = useState();
  const [loaderData,setLoader] = useState(false)
  const [selectLoader,setselectLoader] = useState(false)
  const [certificateData,setcertificateData] = useState(false)
  const navigate = useNavigate();

  useEffect(()=>{
    if(getCert !== undefined){
      setselectLoader(false)
      if(getCert[0]?.message === "No data found for respective serivce"){
        setcertificateData(true)
      }else{
        setcertificateData(false)
        const data123 = {
          url: getCert[0]?.data.OUTPUTURL[0],
        };
        axios
          .post(`${BASE_URL}esevai/getpdf`, data123, {
            responseType: "arraybuffer",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
            },
          })
          .then((res) => {
  
            const url = Buffer.from(res.data).toString("base64");
  
            setpdfData(url);
          })
          .catch((err) => {
          });
      }
    }
  },[getCert])

  const handleconsent = () => {
    if (consent === true) {
      setconsent(false);
    } else {
      setconsent(true);
    }
  };

  useEffect(() => {
    /* AXIOS INTERCEPTOR */
    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err?.response?.status === 502) {
          window.location.href = "/service-unavailable"; 
        }
        return Promise.reject(err);
      }
    );
    if (selectedIndex === 0) {
      setSelectedIndex(1);
      const data123 = {
        url: location?.state?.certificate !== undefined ? location?.state?.certificate[0]?.data.OUTPUTURL[0] : '',
      };
      axios
        .post(`${BASE_URL}esevai/getpdf`, data123, {
          responseType: "arraybuffer",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          const url = Buffer.from(res.data).toString("base64");
          setpdfData(url);
        })
        .catch((err) => {
        });
    }
  }, [location?.state?.certificate, location?.state?.selectData, selectedIndex]);

  const handleDaata = () => {
    setrepeatloop(0);
  };
  const datahandle = () => {
    setrepeatloop(1);
  };

  if (repeatloop === 1) {
    const body = {
      certificateno: location?.state?.certificate[0]?.data.APPNO[0],
    };
    dispatch(getCertData(body, loginData?.data?.token));
    setrepeatloop(2);
  }
  const AddToWallet = () => {
    if (consent === true) {
      setLoader(true)
      const body = {
        certificatedetails: {
          SERVICENAME:
            services.certData["SERVICE NAME"] !== undefined
              ? services.certData["SERVICE NAME"][0]
              : "NA",
          APPLICANTNAME:
            services.certData["APPLICANT NAME"] !== undefined
              ? services.certData["APPLICANT NAME"][0]
              : "NA",
          FATHERHUSNAME:
            services.certData["FATHER/HUSBAND NAME"] !== undefined
              ? services.certData["FATHER/HUSBAND NAME"][0]
              : "NA",
          ADDRESS:
            services.certData.ADDRESS !== undefined
              ? services.certData.ADDRESS[0]
              : "NA",
          VILLTOWN:
            services.certData["VILLAGE/TOWN"] !== undefined
              ? services.certData["VILLAGE/TOWN"][0]
              : "NA",
          TALUK:
            services.certData.TALUK !== undefined
              ? services.certData.TALUK[0]
              : "NA",
          DISTRICT:
            services.certData.DISTRICT !== undefined
              ? services.certData.DISTRICT[0]
              : "NA",
          PINCODE:
            services.certData.PINCODE !== undefined
              ? services.certData.PINCODE[0]
              : "NA",
          OCCUPATION:
            services.certData.OCCUPATION !== undefined
              ? services.certData.OCCUPATION[0]
              : "NA",
          ANNUALINCOME:
            services.certData["ANNUAL INCOME"] !== undefined
              ? services.certData["ANNUAL INCOME"][0]
              : "NA",
          ISSUINGAUTHORITY:
            services.certData["ISSUING AUTHORITY"] !== undefined
              ? services.certData["ISSUING AUTHORITY"][0]
              : "NA",
          AADHAARNO:
            services.certData["AADHAR NO."] !== undefined
              ? services.certData["AADHAR NO."][0]
              : "NA",
          DATEOFISSUE:
            services.certData["DATE OF ISSUE"] !== undefined
              ? services.certData["DATE OF ISSUE"][0]
              : "NA",
          DATEOFEXPIRY:
            services.certData["DATE OF EXPIRY"] !== undefined
              ? services.certData["DATE OF EXPIRY"][0]
              : "NA",
          CERTIFICATENO:
            services.certData.CERTIFICATENO !== undefined
              ? services.certData.CERTIFICATENO[0]
              : "NA",
        },
        certificatelink:
          services.certData.OUTPUTPDF !== undefined
            ? services.certData.OUTPUTPDF[0]
            : "NA",
        certificateno:
          services.certData.CERTIFICATENO !== undefined
            ? services.certData.CERTIFICATENO[0]
            : "NA",
      };
      axios
        .post(`${BASE_URL}esevai/addtowallet`, body, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
          },
        })
        .then((res) => {
          setLoader(false)
            Swal.fire({
              icon: "success",
              title: "",
              text: "Added to wallet successfully",
              confirmButtonText: "OK",
              confirmButtonColor: "#154272",
            }).then(function () {
              navigate("/OurServices/esevai/addDocument");
            });
        })
        .catch((err) => {
          setLoader(false)
          Swal.fire({
            icon: "error",
            title: "",
            text: err.response.data.message,
            confirmButtonText: "OK",
            confirmButtonColor: "#154272",
          });

          if (err?.response?.status === 401) {
            const data = {
              makkalid: sessionStorage.user,
              refreshToken: sessionStorage.getItem("refreshToken"),
            };
            axios
              .post(`${BASE_URL}` + `user/token`, data)
              .then((res) => {
                sessionStorage.setItem("authtoken", res.data.data.token);
                sessionStorage.setItem(
                  "refreshToken",
                  res.data.data.refreshToken
                );
                window.location.reload();
              })
              .catch((err) => {
                const data = {
                  refreshToken: sessionStorage.getItem("refreshToken"),
                };
                axios.post(`${BASE_URL}` + "user/logout", data).then((res) => {
                  Swal.fire({
                    icon: "error",
                    title: "Session Expired",
                    text: "",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#154272",
                  }).then(function () {
                    window.location.href = "/";
                  });
                });
              });
          }
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please give your consent",
        text: "",
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      })
    }
  };

  let ListData = [];
  if (location?.state?.selectData !== undefined) {
    for (var i = 0; i < location?.state?.selectData.length; i++) {
      for (var k = 0; k < location?.state?.services.length; k++) {
        if (location?.state?.selectData[i] == location?.state?.services[k].servicecode) {
          ListData.push(location?.state?.services[k]);
        }
      }
    }
  }

  const handleselect = (e) => {
    setselectLoader(true)
    setselctValue(e.target.value);
    const body = {
      id: sessionStorage.getItem('esevai_id'),
      aadharid: sessionStorage.getItem('esevai_adhar'),
      servicecode: [e.target.value],
    }
    dispatch(getCertificates(body))
  };

  return (
    <div style={{overflow:'hidden'}} id="esevaiTab"> 
      <div style={{marginLeft:'5%'}}>
              <center>
              {certificateData !== true &&
                <div className="justify-center text-xl font-bold" style={{marginBottom: "20px",marginTop:'1rem' }}>
                  <p className="justify-center">{t("fetch_cert")}</p>
                </div>
              }
              </center>
              {selectLoader !== true ?
              <div>
                <center>
                    <select
                      onChange={handleselect}
                      value={selctValue}
                      style={{
                        padding: "10px",
                        border: "1px solid grey",
                        borderRadius: "5px",
                        marginBottom: "1rem",
                        width: "300px",
                      }}
                    >
                      <option>Select</option>
                      {ListData.length !== 0 &&
                        ListData.map((item) => (
                          <option value={item.servicecode}>
                            {item.service}
                          </option>
                        ))}
                    </select>
                </center>
              </div>
              :
              <div className="row">
                <center>
                  <img src={loaderimg} alt="" style={{width:'50px'}} />
                </center>
              </div>
              }


              {certificateData !== true ?
              <div>
              {repeatloop === 0 ? (
                <>
                  <div
                    className="justify-center"
                    style={{
                      marginLeft: "4%",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >   
                  <div className='row text-start'>
                    <p><FaArrowAltCircleLeft onClick={()=>navigate(-1)} style={{fontSize:'25px'}}/></p>
                    </div>

                  <center>
                    <div className='row w-100 text-end' style={{marginTop:'0px'}}>          
                        <center><button onClick={datahandle} id="Proceed_button" >Proceed to secure data in Blockchain</button></center>        
                    </div>
                  </center> 

                    <div className='row' id="mobileDoc">
                      <center>
                        <Document file={`data:application/pdf;base64,${pdfUrlData}`}>
                          <Page pageNumber={1} />
                        </Document>
                      </center>
                    </div>
                  </div>
                </>
              ) : (
                <div id="labelCert">
                  <div className='row text-start'>
                    <p><FaArrowAltCircleLeft onClick={handleDaata} style={{fontSize:'25px'}}/></p>
                  </div>
                  <center><label  style={{marginBottom:'2rem',textDecoration:'underline'}}>Certificate Data</label></center>
                  <center>
                    <div
                      className="grid justify-center grid-cols-2 gap-8 mt-6 "
                      style={{ display: "flex", width: "70%"}}
                    >
                      <div
                        className="justify-center font-bold"
                        style={{ width: "35%" }}
                      >
                        {t("Name")}
                      </div>
                      <div
                        className="justify-center font-bold"
                        style={{ width: "10%" }}
                      >
                        :
                      </div>
                      <div className="justify-center" style={{ width: "45%" }}>
                        {services?.certData !== undefined && (
                          <>{services?.certData["APPLICANT NAME"][0]}</>
                        )}
                      </div>
                    </div>
                  </center>
                  <center>
                    <div
                      className="grid justify-center grid-cols-2 gap-8 mt-6 "
                      style={{ display: "flex", width: "70%"}}
                    >
                      <div
                        className="justify-center font-bold"
                        style={{ width: "35%" }}
                      >
                        {t("DO")}
                      </div>
                      <div
                        className="justify-center font-bold"
                        style={{ width: "10%" }}
                      >
                        :
                      </div>
                      <div className="justify-center" style={{ width: "45%" }}>
                        {services.certData !== undefined && (
                          <>{services.certData["FATHER/HUSBAND NAME"][0]}</>
                        )}
                      </div>
                    </div>
                  </center>
                  <center>
                    <div
                      className="grid justify-center grid-cols-2 gap-8 mt-6 "
                      style={{ display: "flex", width: "70%"}}
                    >
                      <div
                        className="justify-center font-bold"
                        style={{ width: "35%" }}
                      >
                        {t("No")}
                      </div>
                      <div
                        className="justify-center font-bold"
                        style={{ width: "10%" }}
                      >
                        :
                      </div>
                      <div className="justify-center" style={{ width: "45%" }}>
                        {services.certData !== undefined && (
                          <>{services.certData.CERTIFICATENO[0]}</>
                        )}
                      </div>
                    </div>
                  </center>
                  <center>
                    <div
                      className="grid justify-center grid-cols-2 gap-8 mt-6 "
                      style={{ display: "flex", width: "70%"}}
                    >
                      <div
                        className="justify-center font-bold"
                        style={{ width: "35%" }}
                      >
                        Date Of Issue
                      </div>
                      <div
                        className="justify-center font-bold"
                        style={{ width: "10%" }}
                      >
                        :
                      </div>
                      <div className="justify-center" style={{ width: "45%" }}>
                        {services.certData !== undefined && (
                          <>{services.certData["DATE OF ISSUE"][0]}</>
                        )}
                      </div>
                    </div>
                  </center>
                  <center>
                    <div
                      className="grid justify-center grid-cols-2 gap-8 mt-6 "
                      style={{ display: "flex", width: "70%"}}
                    >
                      <div
                        className="justify-center font-bold"
                        style={{ width: "35%" }}
                      >
                        District
                      </div>
                      <div
                        className="justify-center font-bold"
                        style={{ width: "10%" }}
                      >
                        :
                      </div>
                      <div className="justify-center" style={{ width: "45%" }}>
                        {services.certData !== undefined && (
                          <>{services.certData.DISTRICT[0]}</>
                        )}
                      </div>
                    </div>
                  </center>
                  <center>
                    <div
                      className="grid justify-center grid-cols-2 gap-8 mt-6 "
                      style={{ display: "flex", width: "70%"}}
                    >
                      <div
                        className="justify-center font-bold"
                        style={{ width: "35%" }}
                      >
                        Issuing Authority
                      </div>
                      <div
                        className="justify-center font-bold"
                        style={{ width: "10%" }}
                      >
                        :
                      </div>
                      <div className="justify-center" style={{ width: "45%" }}>
                        {services.certData !== undefined && (
                          <>{services.certData["ISSUING AUTHORITY"][0]}</>
                        )}
                      </div>
                    </div>
                  </center>
                </div>
              )}
              </div>
              :
                    <>
                        <div className='row text-start'>
                        <p><FaArrowAltCircleLeft onClick={()=>navigate(-1)} style={{fontSize:'25px'}}/></p>
                        </div>
                        <center>
                          <div className="mt-5">
                            <label style={{fontWeight:'bold',fontSize:'20px'}}>No Found Data</label>
                          </div>
                        </center>
                    </>
              }

              <div className="flex justify-center mt-10"></div>
              {repeatloop !== 0 && (
                <>
                  <div className="flex justify-center m-12 space-x-2" style={{marginTop:'0px'}}>
                    <input
                      type="checkbox"
                      className="self-center"
                      onClick={() => handleconsent()}
                    />
                    <p className="font-bold " id="consentState">{t("IConfirm")}</p>
                  </div>

                  <div
                    style={{
                      marginTop:"-30px",
                      marginBottom: "1rem",
                    }}
                  >
                    {loaderData !== true ?
                      <center>
                        <button onClick={AddToWallet} id="Proceed_button">{t("add")}</button>
                      </center>
                    :
                      <img src={loading} alt="" style={{width:'70px',marginLeft:'49%'}} />
                    }
                  </div>
                </>
              )}
            </div>
    </div>
  );
};
export default UpdateModal;
