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
import loaderImg from "../../Assets/Loading_2.gif"
import loading from "../../Assets/Loading_2.gif"
import logo from '../../Assets/Mask_Group_1.png'
import { useTranslation } from "react-i18next";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { shareCertificate } from '../store/esevai/action'
import "../../style/components/certificate.css"


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

function RegisterDocumentEduCert(props) {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation();
  const [loader,setLoader] = useState(false)
  let loginData = useSelector((store) => store.certificate.otp_verification)
  let EduCert = useSelector((store) => store.certificate.getAll_educert.data) 
  let SevCert = useSelector((store) => store.certificate.getAll_sevcert.data)
  let DmeCert = useSelector((store) => store.certificate.dmeList.data)
  const [code, setCode] = useState('pdf')
  const [pdfFile,setPdfFile] = useState(location?.state?.data?.certificate?.data)
  const [certificateData,setcertificateData]= useState(location?.state?.data?.certificatedata)
  const [Id_Data,setidData] = useState(location?.state?.data)
  const screenFrom = location?.state?.screen
  const [fileName,setFileName] = useState(location?.state?.data?.certificate?.filename)
  const [popup,setPopup] = useState(false)
  const [repName,setrepName] = useState(undefined)
  const [email,setEmail] = useState(undefined)
  const [certificateType,setCertificateType] = useState(undefined)
  const [validity,setValidity] = useState(undefined)
  const [consentpop,setconsentpop] = useState(false)
  const [consentCheck,setConsentCheck] = React.useState(false)
  const [ConsentData,setConsent] = React.useState(false)
  const [shareValidity, setshareValidity] = React.useState(0)
  const [certificateExpiry, setcertificateExpiry] = React.useState()
  const [certificateTypeData,setcertificateTypeData] = React.useState(undefined)
  const [certificateName,setcertificateName] = React.useState(undefined)
  const [submitLoader,setSubmitLoader] = useState(false)
  const [pdfData,setPdf] = useState('data:image/png;base64,'+location?.state?.data?.certificate?.data)
  const [name,setName] = useState('')
  const [shareLoader, setshareLoader] = useState(false)
  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  
 const handleCertificateData=()=>{
  if(code === "pdf"){
    setCode('data')
  }
  else{
    setCode('pdf')
  }
 }

 const openConsent=(data)=>{
    setconsentpop(true)
    setConsent(true);
  }


 const handleShare=()=>{
  if(consentCheck === true){
    setPopup(!popup)
  }else{
    Swal.fire({
      icon: "error",
      title: "",
      text: "Please give your consent",
      confirmButtonText: "OK",
    });
  }
 }


 const shareFunc = () => {
      var data = undefined
      if(repName !== '' && email !== ''){
        const validate =  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
        if(validate === true){
          setshareLoader(true)
          if(Id_Data.rollno !== undefined){
            let body=""
            if(screenFrom !== "DME"){
              body={
                flag: Id_Data.flag,
                recipientname: repName,
                recipientmail: email,
                validity: shareValidity,
                rollno: Id_Data.certificatedata.Certificate.issuedTo.person.roll,
              }

            dispatch(shareCertificate(body))
            }else{
              body={
                recipientname: repName ,
                recipientmail: email,
                validity: shareValidity,
                course: Id_Data.course,
                rollno: Id_Data.rollno
              }

              let AuthorizationToken = sessionStorage.getItem("authtoken")
              axios.post('https://www.epettagam.tn.gov.in/wallet/dme/wallet/share',body,{
                  headers: {
                    Authorization: "Bearer " + AuthorizationToken,
                  },
                })
                .then((res)=>{
                    setPopup(!popup)
                  Swal.fire({
                    icon: "success",
                    title: "",
                    text:"Certificate shared successfully",
                    confirmButtonText: "OK",
                  });

                })
                .catch((err)=>{
                  
                } )            
            }
            
            setIsOpen(false);
            setshareLoader(false)
          }else{
            data=Id_Data.certificatedata.CERTIFICATENO[0]
            const body={
              certificatetype: certificateTypeData,
              recipientname: repName,
              recipientmail: email,
              validity: shareValidity,
              certificateid: Id_Data.certificateid,
            }
            dispatch(shareCertificate(body))
            setIsOpen(false);
            setPopup(!popup)
            setshareLoader(false)
            
          }
        }else{
          Swal.fire({
            icon: "warning",
            title: "",
            text: 'Invalid Email ID',
            confirmButtonText: "OK", 
            confirmButtonColor: "#154272",
          });
        }
      }else{
        Swal.fire({
          icon: "warning",
          title: "",
          text: 'Fill all the fields',
          confirmButtonText: "OK", 
          confirmButtonColor: "#154272",
        });
      }
    
  }


 const setshareValidityDay = (e) =>{
    setshareValidity(parseInt(e.target.value))
  
    const value = parseInt(e.target.value)
    var date = new Date();
    date.setDate(date.getDate() + value)
  
      const date1 =date.toLocaleString()
      const date2=date1.split(',')
      const date3 =date2[0].split('/')
      const date4 = date3[2]+'-'+date3[1]+'-'+date3[0]
  
      setcertificateExpiry(date4)
  }


  function CloseConsent(data) {
    setConsent(false);
  }


  const consentSubmit=()=>{
    if(certificateTypeData !== undefined && certificateName !== undefined && shareValidity !== undefined){
      if(shareValidity <= 90){
          setSubmitLoader(true)
          const body={
            certificatetype : certificateTypeData,
            userid : sessionStorage.getItem('User_ID'),
            certificatename : certificateName,
            certificateexpiry : certificateExpiry,
            sharevalidity : shareValidity
          }
  
          let AuthorizationToken = sessionStorage.getItem("authtoken") 
  
          axios.post('https://www.epettagam.tn.gov.in/wallet/user/con/shareconsent',body,{
            headers: {
              Authorization: "Bearer " + AuthorizationToken,
            },
          })
          .then((res)=>{
            setConsent(false)
            setSubmitLoader(false)              
            setConsentCheck(true)
            Swal.fire({
              icon: "success",
              title: "",
              text: "Consent added successfully",
              confirmButtonText: "OK",
            });
          })
          .catch((err)=>{
            setSubmitLoader(false)
            Swal.fire({
              icon: "error",
              title: "",
              text:
                err.response.data !== undefined ? err.response.data.message : err.message,
              confirmButtonText: "OK",
            });
  
          })
        }else{
          Swal.fire({
            icon: "warning",
            title: "",
            text: 'Please enter less then 90 days',
            confirmButtonText: "OK", 
            confirmButtonColor: "#154272",
          });
        }
    }else{
      Swal.fire({
        icon: "warning",
        title: "",
        text: 'Fill all the fields',
        confirmButtonText: "OK", 
        confirmButtonColor: "#154272",
      });
    }
  }

  const  downloadPDF=()=>{
    const pdfLink = pdfData;
    const anchorElement = document.createElement('a');
    const fileName = `Document.pdf`;
    anchorElement.href = pdfLink;
    anchorElement.download = fileName;
    anchorElement.click();
}

  return (
    <div className="p-2 text-start" id="registration-Page1">
      <div className='d-flex'>
        <img src={verified} alt=""  id="vewrified_Img"/>
        <label className='reg_label'>This Certificate is Verified By Nambikkai Inaiyam. </label>
      </div> 
      {Id_Data.txid !== undefined && 
        <p id="reg_para">Transaction ID : <span>{Id_Data?.txid}</span></p>
      }
        <div className='row'>
            <div className='col-12'>
            {code === "pdf" &&
                <div>
                    <div className='row text-start'>
                      <p><FaArrowAltCircleLeft onClick={()=>navigate(-1)} style={{fontSize:'25px'}}/></p>
                    </div>
                    <div className='row w-100' style={{marginTop:'0px'}}>          
                        <center><button onClick={handleCertificateData} id="Proceed_button" >Proceed to share your data</button></center>         
                    </div>
                    <div className='mt-1 row w-100' id="mobileDoc">
                      <center>
                      <Document  file={`data:application/pdf;base64,${pdfFile}`}>
                        <Page pageNumber={1} />
                      </Document>
                      </center>
                    </div>
                </div>
            }
            {code === "data" &&
                <div>
                    {screenFrom === "DME" ?
                        <div>
                                <div className='row' id="labelCert">
                                  <div className='row text-start'>
                                    <p><FaArrowAltCircleLeft onClick={handleCertificateData} style={{fontSize:'25px'}}/></p>
                                  </div>
                                <center><label >Certificate Data</label></center>
                                <div className='mt-3 row' id="valueArea">
                                <div className='col-md-6'>
                                    <div className="row">
                                    <div className='col-6'><p id="variable">Certificate Name:</p></div>
                                    <div className='col-6'><p id="valueData">{certificateData?.name}</p></div>
                                    </div>
                                    <div className="row">
                                    <div className='col-6'><p id="variable">Roll No:</p></div>
                                    <div className='col-6'><p id="valueData">{location?.state?.data?.rollno}</p></div>
                                    </div>
                                    <div className="row">
                                    <div className='col-6'><p id="variable">Issued By:</p></div>
                                    <div className='col-6'><p id="valueData">{certificateData?.IssuedBy?.Organization?.name}</p></div>
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
                                    <div className='col-6'><p id="variable">Gender:</p></div>
                                    <div className='col-6'><p id="valueData">{certificateData?.IssuedTo?.Person?.gender}</p></div>
                                    </div>
                                    <div className="row">
                                    <div className='col-6'><p id="variable">Certificate Number:</p></div>
                                    <div className='col-6'><p id="valueData">{certificateData?.number}</p></div>
                                    </div>
                                    <div className="row">
                                    <div className='col-6'><p id="variable">School Name:</p></div>
                                    <div className='col-6'><p id="valueData">{certificateData?.CertificateData?.School?.name}</p></div>
                                    </div>
                                </div>
                                </div>
                                </div> 
                                <div>
                                <div className='mt-2' id="hereData" style={{display:'flex'}}>
                                    <input type="checkbox" checked={consentCheck} onClick={openConsent} /><p id="herebydata" >{t("hereby")}.</p>
                                </div>
                                </div>
                            
                            <div className='row w-100 text-end' id="buttonArea" style={{marginTop:'30px'}}>           
                                <button onClick={()=>downloadPDF()} id="DownloadButton">
                                {t("down")}
                                </button> <button onClick={handleShare} id="DownloadButton1">{t("Share")}</button>         
                            </div>
                        </div>
                    :
                      <div>
                        {Id_Data?.rollno !== undefined ?
                          <div className="mt-6 mb-6 " id="labelCert">

                                    <div className='row text-start'>
                                      <p><FaArrowAltCircleLeft onClick={handleCertificateData} style={{fontSize:'25px'}}/></p>
                                    </div>
                                  <center><label  style={{marginBottom:'2rem',textDecoration:'underline'}}>Certificate Data</label></center>
                              <div className="grid justify-end grid-cols-2 gap-8" id="certData">
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("Name")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.Certificate !== undefined ? Id_Data.certificatedata.Certificate.issuedTo.person.name : Id_Data.certificatedata.issuedTo.person.name}</div>
                              </div>
                              <div className="grid items-end justify-end grid-cols-2">
                                  <div className="font-bold" id="enter">{t("Roll_No")}.</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata?.Certificate !== undefined ? Id_Data.certificatedata.Certificate.issuedTo.person.roll : Id_Data.certificatedata.issuedTo.person.roll}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("dob")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata?.Certificate !== undefined ? Id_Data.certificatedata.Certificate.issuedTo.person.dob : Id_Data.certificatedata.issuedTo.person.dob }</div>
                              </div>
                              <div className="grid items-end justify-end grid-cols-2">
                                  <div id="enter" className="font-bold">{t("Class")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata?.Certificate !== undefined ? Id_Data.certificatedata.Certificate.issuedTo.person.class : Id_Data.certificatedata.issuedTo.person.class}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData" >
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("random")}.</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate !== undefined ? Id_Data.certificatedata.Certificate.issuedTo.person.randomNo : Id_Data.certificatedata.issuedTo.person.randomNo}</div>
                              </div>
                              <div className="grid items-end grid-cols-2">
                                  <div id="enter" className="font-bold">{t("Year_Passing")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate !== undefined ? Id_Data.certificatedata.Certificate.CertificateData.examination.year : Id_Data.certificatedata.CertificateData.examination.year}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("month")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate !== undefined ? Id_Data.certificatedata.Certificate.CertificateData.examination.month : Id_Data.certificatedata.CertificateData.examination.month}</div>
                              </div>
                              <div className="grid items-end grid-cols-2">
                                  <div id="enter" className="font-bold">{t("tmr")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate !== undefined ? Id_Data.certificatedata.Certificate.CertificateData.info.tmrCode : Id_Data.certificatedata.CertificateData.info.tmrCode}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                              <div className="grid grid-cols-2">
                                  <div id="enter" className="font-bold">{t("Session")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate !== undefined ? Id_Data.certificatedata.Certificate.CertificateData.examination.session : Id_Data.certificatedata.CertificateData.examination.session}</div>
                              </div>
                              <div className="grid grid-cols-2">
                                  <div id="enter" className="font-bold">{t("tmrdate")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate !== undefined ? Id_Data.certificatedata.Certificate.CertificateData.info.tmrDate : Id_Data.certificatedata.CertificateData.info.tmrDate}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                              <div className="grid grid-cols-2">
                                  <div id="enter" className="font-bold">{t("Med")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate !== undefined ? Id_Data.certificatedata.Certificate.CertificateData.school.medium : Id_Data.certificatedata.CertificateData.school.medium}</div>
                              </div> 
                              <div className="grid grid-cols-2">
                                  <div id="enter" className="font-bold">{t("Tmar")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate !== undefined ? Id_Data.certificatedata.Certificate.CertificateData.performance.marksTotal : Id_Data.certificatedata.CertificateData.performance.marksTotal}</div>
                              </div> 
                              
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                                                  
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("Organization")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: <p style={{textAlign:'justify'}}>{Id_Data.certificatedata.Certificate !== undefined ? Id_Data.certificatedata.Certificate.issuedBy.organization.name : Id_Data.certificatedata.issuedBy.organization.name}</p></div>
                              </div>
                              <div className="grid grid-cols-2">
                                  <div id="enter" className="font-bold">{t("School_Name")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate !== undefined ? Id_Data.certificatedata.Certificate.CertificateData.school.name : Id_Data.certificatedata.CertificateData.school.name}</div>
                              </div>
                              
                              </div>

                              
                              <div className='mt-3 row w-100'>
                                <table>
                                  <thead style={{background:'#154272'}}>
                                    <th className='p-1 text-white'>Subject</th>
                                    <th className='p-1 text-white'>Theory Marks</th>
                                    <th className='p-1 text-white'>Practical Marks</th>
                                    <th className='p-1 text-white'>Internal Marks</th>
                                    <th className='p-1 text-white'>Total Marks</th>
                                  </thead>
                                  <tbody>
                                    {Id_Data !== undefined && Id_Data.certificatedata.Certificate !== undefined ?
                                    <>
                                    {Id_Data?.certificatedata?.Certificate?.CertificateData?.performance?.subjects.map((item,indx)=>(
                                    <tr style={{background:indx%2 == 1 ? '#e6f7ff':''}}>
                                      <td style={{fontSize:'15px'}}>{item.name}</td>
                                      <td style={{fontSize:'15px'}}>{item.marksTheory}</td>
                                      <td style={{fontSize:'15px'}}>{item.marksPractical}</td>
                                      <td style={{fontSize:'15px'}}>{item.marksInternal}</td>
                                      <td style={{fontSize:'15px'}}>{item.marksTotal}</td>
                                    </tr>
                                    ))}
                                    </>
                                    :
                                    <>
                                    {Id_Data?.certificatedata?.CertificateData?.performance?.subjects.map((item,indx)=>(
                                    <tr style={{background:indx%2 == 1 ? '#e6f7ff':''}}>
                                      <td style={{fontSize:'15px'}}>{item.name}</td>
                                      <td style={{fontSize:'15px'}}>{item.marksTheory}</td>
                                      <td style={{fontSize:'15px'}}>{item.marksPractical}</td>
                                      <td style={{fontSize:'15px'}}>{item.marksInternal}</td>
                                      <td style={{fontSize:'15px'}}>{item.marksTotal}</td>
                                    </tr>
                                    ))}
                                    </>
                                    }
                                  </tbody>
                                </table>
                              </div>

                                <div className='mt-4' id="hereData" style={{display:'flex'}}>
                                      <input type="checkbox" checked={consentCheck} onClick={openConsent} /><p id="herebydata" >{t("hereby")}.</p>
                                  </div>
                              
                              <div className='row w-100 text-end' id="buttonArea" style={{marginTop:'30px'}}>           
                                  <button onClick={()=>downloadPDF()} id="DownloadButton">
                                  {t("down")}
                                  </button> <button onClick={handleShare} id="DownloadButton1">{t("Share")}</button>         
                              </div>
                          </div>
                        :
                          <div className="mt-6 mb-6 " id="labelCert">

                              <div className='row text-start'>
                                <p><FaArrowAltCircleLeft onClick={handleCertificateData} style={{fontSize:'25px'}}/></p>
                              </div>
                              <center><label  style={{marginBottom:'2rem',textDecoration:'underline'}}>Certificate Data</label></center>
                              <div className="grid justify-end grid-cols-2 gap-8" id="certData">
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("Name")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata["APPLICANTNAME"] !== undefined ? Id_Data?.certificatedata["APPLICANTNAME"] : Id_Data?.certificatedata["APPLICANT NAME"]}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">Certificate Number</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata["CERTIFICATENO"]}</div>
                              </div>
                              <div className="grid items-end justify-end grid-cols-2">
                                  <div id="enter" className="font-bold">{t("serName")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata['SERVICENAME'] !== undefined ? Id_Data?.certificatedata['SERVICENAME'] : Id_Data?.certificatedata['SERVICE NAME']}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData" >
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("Issuing_Authority")}.</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata['ISSUINGAUTHORITY'] !== undefined ? Id_Data?.certificatedata['ISSUINGAUTHORITY'] : Id_Data?.certificatedata['ISSUING AUTHORITY']}</div>
                              </div>
                              <div className="grid items-end grid-cols-2">
                                  <div id="enter" className="font-bold">{t("DI")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata['DATEOFISSUE'] !== undefined ? Id_Data?.certificatedata['DATEOFISSUE'] : Id_Data?.certificatedata['DATE OF ISSUE']}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("vill")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata['VILLTOWN'] !== undefined ? Id_Data?.certificatedata['VILLTOWN'] : Id_Data?.certificatedata['VILLAGE/TOWN']}</div>
                              </div>
                              <div className="grid items-end grid-cols-2">
                                  <div id="enter" className="font-bold">{t("District")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata['DISTRICT']}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                              <div className="grid grid-cols-2">
                                  <div id="enter" className="font-bold">{t("Taluk")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata['TALUK']}</div>
                              </div>
                              <div className="grid grid-cols-2">
                                  <div id="enter" className="font-bold">Pincode</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata['PINCODE']}</div>
                              </div>
                              
                              </div>


                                <div className='mt-4' id="hereData" style={{display:'flex'}}>
                                      <input type="checkbox" checked={consentCheck} onClick={openConsent} /><p id="herebydata" >{t("hereby")}.</p>
                                  </div>
                              
                              <div className='row w-100 text-end' id="buttonArea" style={{marginTop:'30px'}}>           
                                  <button onClick={()=>downloadPDF()} id="DownloadButton">
                                  {t("down")}
                                  </button> <button onClick={handleShare} id="DownloadButton1">{t("Share")}</button>         
                              </div>
                          </div>
                        }
                      </div>
                    }
                    
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
              </div>
              <div className="flex grid grid-cols-2">
                <input onChange={(e)=>setCertificateType(e.target.value)} value={certificateType} className="mt-2 border-2 border-solid rounded " placeholder='Eg:- Income certificate' style={{width:'250px',backgroundColor:'#FBFBFE',padding:'5px'}}/>
                
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


      <Modal
              isOpen={ConsentData}
              onRequestClose={CloseConsent}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="flex grid grid-cols-2" style={{backgroundColor:'#144272'}}>
                <div className="" style={{display: 'flex',width:'155%'}}>
                    <img alt='' src={logo} style={{width:'50px',marginTop:'3px',marginBottom:'3px',marginLeft:'5%'}}/>
                    <p id="enter" style={{color:'#FFFFFF',marginTop:'20px',marginLeft:'20px',fontWeight:'bold',fontSize:'15px'}}>{t("cons")}</p> 
                </div>
                <div className="mt-2">
                    <a href style={{fontWeight:'bold',marginTop:'20px',fontSize:'24px',cursor:'pointer',textAlign:'right',color:'white',marginLeft:'85%'}} onClick={() => CloseConsent(false)}>X</a>
                </div>
              </div>
              <div className="flex grid grid-cols-2 mt-6">
                <label className="text-base" style={{fontSize:'15px'}}>{t("Certificate_Type")}</label>
                <label className="text-base" style={{fontSize:'15px'}}>{t("Certificate_name")}</label>
              </div>
              <div className="flex grid grid-cols-2">
                <input className="mt-2 border-2 border-solid rounded " placeholder='Certificate type' style={{width:'250px',backgroundColor:'#FBFBFE',padding:'5px'}}
                
                onChange={(e)=> setcertificateTypeData(e.target.value)}
                 value={certificateTypeData}/>
                <input className="mt-2 border-2 border-solid rounded " placeholder='Certificate name' style={{width:'250px',backgroundColor:'#FBFBFE',padding:'5px'}}
                onChange={(e)=>setcertificateName(e.target.value)} value={certificateName}/>
              </div>
              <div className="flex grid grid-cols-2 mt-4" >
                
                <label className="text-base " style={{fontSize:'15px'}}>{t("validity")}</label>
              </div>
              <div className="flex grid grid-cols-2">
               
                <input type='number' className="mt-2 border-2 border-solid rounded " maxLength={2} placeholder='Share validity days' style={{width:'250px',backgroundColor:'#FBFBFE',padding:'5px'}} 
                onChange={(e)=>setshareValidityDay(e)} value={shareValidity}/>
              </div>
              <div>
                <div>
                  {submitLoader === false ?
                    <button onClick={consentSubmit}  className="" style={{border:'2px solid #144272', padding:'5px 15px',borderRadius: '10px',backgroundColor:'#144272',color:'white',marginTop:'10px',marginLeft:'85%',fontWeight:'bold'}}>{t("submit")}</button> 
                  :
                    <img src={loaderImg} style={{width:'70px',marginLeft:'86%',marginTop:'-2rem'}}  alt='' />
                  }
                  </div>

              </div>
      </Modal>
    </div>
  )
}

export default RegisterDocumentEduCert
