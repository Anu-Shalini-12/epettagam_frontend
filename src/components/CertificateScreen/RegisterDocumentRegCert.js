import React, {useState,useEffect} from 'react'
import Card from '../component/UI/Card3'
import ButtonFill from '../component/UI/ButtonFill'
import { useNavigate, useLocation } from 'react-router-dom'
import loginLog from '../../Assets/Group 799.svg'
import { useSelector, useDispatch } from 'react-redux'
import verified from "../../Assets/verified.png"
import "../../style/components/_registration.scss"
import { Document, Page } from "react-pdf";
import { AiFillCaretLeft,AiFillCaretRight } from "react-icons/ai";
import Modal from 'react-modal';
import { BASE_URL } from "../../components/utilities/config"; 
import axios from "axios";
import Swal from 'sweetalert2'
import loading from "../../Assets/Loading_2.gif"
import logo from '../../Assets/Mask_Group_1.png'
import { useTranslation } from "react-i18next";
import "../../style/components/certificate.css"
import { FaArrowAltCircleLeft } from "react-icons/fa";


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      width:'70%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

function RegisterDocumentRegCert(props) {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation();
  const [loader,setLoader] = useState(false)
  const [code, setCode] = useState('pdf')
  const [pdfFile,setPdfFile] = useState(location?.state?.data?.certificate?.data)
  const [certificateData,setcertificateData]= useState(location?.state?.data?.certificatedata)
  const [fileName,setFileName] = useState(location?.state?.data?.certificate?.filename)
  const [popup,setPopup] = useState(false)
  const [repName,setrepName] = useState(undefined)
  const [email,setEmail] = useState(undefined)
  const [certificateType,setCertificateType] = useState(undefined)
  const [validity,setValidity] = useState(undefined)
  
 const handleCertificateData=()=>{
  if(code === "pdf"){
    setCode('data')
  }else{
    setCode("pdf")
  }
 }


 const handleShare=()=>{
    setPopup(!popup)
 }


 const shareFunc=()=>{
    const body={
        recipientname: repName,
        recipientmail: email,
        validity: validity,
        certificatetype: certificateType,
        certificateid: location?.state?.data?.certificateid
    }


    axios.post(`${BASE_URL}rg/wallet/share`,body,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
        },
      }).then((res)=>{
        setLoader(false)
        Swal.fire({
          icon: "success",
          title: "",
          text: res.data.message,
          confirmButtonText: "OK",
        }).then((res)=>{

          setPopup(false)
          setrepName(undefined)
          setEmail(undefined)
          setCertificateType(undefined)
          setValidity(undefined)
        })
      }).catch((err)=>{
        setLoader(false)
        Swal.fire({
          icon: "error",
          title: "",
          text: err.response.data.message,
          confirmButtonText: "OK",
        }).then((res)=>{
          setPopup(false)
          setrepName(undefined)
          setEmail(undefined)
          setCertificateType(undefined)
          setValidity(undefined)
      })
      })
 }
  return (
    <div className="p-5 text-start w-100" id="registration-Page">
       <div className='d-flex'>
        <img src={verified} alt=""  id="vewrified_Img"/>
        <label className='reg_label'>This Certificate is Verified By Nambikkai Inaiyam. </label>
      </div>  
     
      {certificateData.txid !== undefined &&
          <p id="reg_para">Transaction ID : <span>{certificateData.txid}</span></p>
        }
        <div className='row'>
            
            <div className='row text-start'>
              <p><FaArrowAltCircleLeft onClick={()=>navigate(-1)} style={{fontSize:'25px'}}/></p>
            </div>
            <div className='text-center row'>
              <button id="certbutton" onClick={handleCertificateData}> Proceed to share your data </button>
            </div>
            <div className='col-12'>
            {code === "pdf" &&
              <div>

              <div className='mt-1 row w-100' id="mobileDoc">
              <center>
              <Document file={`data:application/pdf;base64,${pdfFile}`}>
                <Page pageNumber={1} />
              </Document>
              </center>
              </div>
              </div>
            }
            {code === "data" &&
                <div>
                    {certificateData.name == "Death Certificate" &&
                        <div className='row' id="labelCert">
                          <div className='row text-start'>
                            <p><FaArrowAltCircleLeft onClick={handleCertificateData} style={{fontSize:'25px'}}/></p>
                          </div>
                        <center><label >Certificate Data</label></center>
                        <div className='mt-3 row'>
                        <div className='col-md-6'>
                            <div className="row">
                            <div className='col-6'><p id="variable">Certificate Name:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.name}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Issue Date:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.issueDate}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Death Place:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Death?.place}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Death District:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Death?.DeathPlace?.district}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Death Taluk:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Death?.DeathPlace?.taluk}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Issued By:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.IssuedBy?.Organization?.name}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Permanent Address:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Death?.ParentsAddress?.permanent}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Present Address:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Death?.ParentsAddress?.present}</p></div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="row">
                            <div className='col-6'><p id="variable">Name:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person?.name}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Date of Death:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Death?.date}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Gender:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person?.gender}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Certificate Number:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.number}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Birth Date:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Death?.date}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Birth Application Number:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Death?.Application?.number}</p></div>
                            </div>
                            <div className="row">
                            <div className='col-6'><p id="variable">Birth State:</p></div>
                            <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Death?.DeathPlace?.state}</p></div>
                            </div>
                        </div>
                        </div>
                        </div> 
                    }
                    {certificateData.name == "Birth Certificate" &&
                        <div className='row' id="labelCert">
                          <div className='row text-start'>
                            <p><FaArrowAltCircleLeft onClick={handleCertificateData} style={{fontSize:'25px'}}/></p>
                          </div>
                        <center><label >Certificate Data</label></center>
                        <div className='mt-3 row'>
                          <div className='col-md-6'>
                            <div className="row">
                              <div className='col-6'><p id="variable">Certificate Name:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.name}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Issue Date:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.issueDate}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Birth Place:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Birth?.place}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Birth District:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Birth?.BirthPlace?.district}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Birth Taluk:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Birth?.BirthPlace?.taluk}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Issued By:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.IssuedBy?.Organization?.name}</p></div>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className="row">
                              <div className='col-6'><p id="variable">Name:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person?.name}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Mother Name:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person?.motherName}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Date of Birth:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person?.dob}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Gender:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person?.gender}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Certificate Number:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.number}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Birth Date:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Birth?.date}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Birth Application Number:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Birth?.Application?.number}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Birth State:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.Birth?.BirthPlace?.state}</p></div>
                            </div>
                          </div>
                        </div>
                      </div> 
                    }
                    {certificateData.name == "Marriage Certificate" &&
                        <div className='row' id="labelCert">
                          <div className='row text-start'>
                            <p><FaArrowAltCircleLeft onClick={handleCertificateData} style={{fontSize:'25px'}}/></p>
                          </div>
                        <center><label >Certificate Data</label></center>
                        <div className='mt-3 row'>
                          <div className='col-md-6'>
                            <div className="row">
                              <div className='col-6'><p id="variable">Certificate Name:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.name}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Issue Date:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.issueDate}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Person 1 Name:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person[0]?.name}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Person 1 Age:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person[0]?.age}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Person 1 dob:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person[0]?.dob}</p></div>
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className="row">
                              <div className='col-6'><p id="variable">Issue Date:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.issueDate}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Certificate Number:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.number}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Person 2 Name:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person[1]?.name}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Person 2 Age:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person[1]?.age}</p></div>
                            </div>
                            <div className="row">
                              <div className='col-6'><p id="variable">Person 2 dob:</p></div>
                              <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person[1]?.dob}</p></div>
                            </div>
                          </div>
                        </div>
                      </div> 
                    }

                    <div className='row w-100 text-end' style={{marginTop:'-30px'}}>          
                      <button onClick={handleShare} id="certbutton">Share Certificate</button>         
                  </div> 
                </div>
            }
            </div>
          </div>
        <Modal
              isOpen={popup}
              onRequestClose={handleShare}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="flex grid-cols-2" style={{backgroundColor:'#144272'}}>
                <div className="" style={{display: 'flex',width:'90%'}}>
                    <img alt='' src={logo} style={{width:'50px',marginTop:'3px',marginBottom:'3px',marginLeft:'5%'}}/>
                    <p id="enter" style={{color:'#FFFFFF',marginTop:'20px',marginLeft:'20px',fontWeight:'bold',fontSize:'18px'}}>{t("portal")}</p> 
                </div>
                <div className="mt-2">
                    <a href style={{fontWeight:'bold',marginTop:'20px',fontSize:'24px',cursor:'pointer',textAlign:'right',color:'white',marginLeft:'90%'}} onClick={() => handleShare(false)}>X</a>
                </div>
              </div>
              <div className="flex grid grid-cols-2 mt-6">
                <label className="text-base font-bold">Name </label>
                <label className="text-base font-bold">Email</label>
              </div>
              <div className="flex grid grid-cols-2">
                <input onChange={(e)=>setrepName(e.target.value)} value={repName} className="mt-2 border-2 border-solid rounded " placeholder='Eg:- xyz' style={{width:'250px',backgroundColor:'#FBFBFE',padding:'5px'}}/>                
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="mt-2 border-2 border-solid rounded " placeholder='Eg:- xyz@gmail.com' style={{width:'250px',backgroundColor:'#FBFBFE',padding:'5px'}}
                />
              </div>
              <div className="flex grid grid-cols-2 mt-4 " >
                <label className="text-base font-bold">Certificate Type</label>
                <label className="text-base font-bold">validity</label>
              </div>
              <div className="flex grid grid-cols-2">
                <input onChange={(e)=>setCertificateType(e.target.value)} value={certificateType} className="mt-2 border-2 border-solid rounded " placeholder='Eg:- Income certificate' style={{width:'250px',backgroundColor:'#FBFBFE',padding:'5px'}}/>
                <input onChange={(e)=>setValidity(e.target.value)} value={validity} className="mt-2 border-2 border-solid rounded " placeholder='Eg:- Income certificate' style={{width:'250px',backgroundColor:'#FBFBFE',padding:'5px'}}/>
                
              </div>
              <div>
                <div>
                  {loader === false ?
                    <button onClick={shareFunc}  className="" style={{border:'2px solid #144272', padding:'5px 15px',borderRadius: '10px',backgroundColor:'#144272',color:'white',marginTop:'10px',marginLeft:'85%',fontWeight:'bold'}}>{t("Share")}</button> 
                  :
                    <img src={loader} style={{width:'30px',marginLeft:'85%',marginTop:'1rem'}} alt=""/>
                  }
                </div>
              </div>
      </Modal>
    </div>
  )
}

export default RegisterDocumentRegCert
