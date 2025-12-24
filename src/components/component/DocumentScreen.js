import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEduCert,getSevCert ,getDmecert} from '../store/certificates/action'
import { shareCertificate } from '../store/esevai/action'
import axios from 'axios'
import {pdfjs } from 'react-pdf'
import Modal from 'react-modal';
import logo from '../../Assets/Mask_Group_1.png'
import loader from "../../Assets/Rolling-1s-200px.gif"
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';
import { Document, Page } from "react-pdf";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'


//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`
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
//Document screen
function  DocumentScreen() {
    const location = useLocation();
    const navigate = useNavigate()
  const { t, i18n } = useTranslation();
  const [share] = useState(false)
  const [Id_Data,setData] = useState('')
  const [pdfData,setPdf] = useState('')
  const [firstData, setFirstData] = useState(true)
  const [certType,setCertType] = useState('')
  const [consentpop,setconsentpop] = useState(false)
  const [submitLoader,setSubmitLoader] = useState(false)
  const [shareLoader, setshareLoader] = useState(false)
  const [name,setName] = useState('')
  const [Dmedata,setDmeData] = useState(false)
  const [dataValue,setDataValue] = useState('pdf')
  const [email,setEmail] = useState('')
  let loginData = useSelector((store) => store.certificate.otp_verification)
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [ConsentData,setConsent] = React.useState(false)
  const [consentCheck,setConsentCheck] = React.useState(false)
  const [certificateType,setCertificateType] = useState(undefined)
  const [certificateTypeData,setcertificateTypeData] = React.useState(undefined)
  const [certificateName,setcertificateName] = React.useState(undefined)
  const [certificateExpiry, setcertificateExpiry] = React.useState()
  const [shareValidity, setshareValidity] = React.useState(0)
  const [searchData, setdatasearch] = useState(false)
  const [loaderState, setLoader] = useState(true)


  useEffect(() => {
    if(searchData === false){
      setdatasearch(true)
      if(sessionStorage.getItem("SearchValue") === "pharmacy" || sessionStorage.getItem("SearchValue") === "nursing"){
        setDmeData(true)
      }
      axios.get("https://www.epettagam.tn.gov.in/wallet/wallet/search/"+sessionStorage.getItem('SearchValue'),{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    }).then((res)=>{
      if(res.data.data.result.length !== 0){
        setData(res.data?.data?.result[0])
      }else{    
        setData(location.state.searchResult)
      }
      setLoader(false)
      const pdf='data:image/png;base64,'+res.data?.data?.result[0]?.certificate?.data  
      setPdf(pdf)
    }).catch((err)=>{
      setLoader(false)
    }) 
    }
  }, [])



  function openModal(data) {
    if(consentpop === true){
      setIsOpen(true);
    }else{
      Swal.fire({
        icon: "warning",
        title: "",
        text: 'Please give your consent to share the certificate',
        confirmButtonText: "OK", 
        confirmButtonColor: "#154272",
      });
    }
  }


  
  function openConsent(data) {
    setconsentpop(true)
    setConsent(true);
  }
  function CloseConsent(data) {
    setConsent(false);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const dispatch = useDispatch()
  
  if(firstData === true){
    // eslint-disable-next-line no-lone-blocks
    {loginData !== '' &&
      dispatch(getSevCert(sessionStorage.user))
      dispatch(getEduCert()) 
      dispatch(getDmecert())
      setFirstData(false)
    }
  }



 const shareFunc = () => {
    var data = undefined
    if(name !== '' && email !== ''){
      const validate =  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
      if(validate === true){
        setshareLoader(true)
        if(Id_Data.rollno !== undefined){
          let body=""
          if(Id_Data.course !== "DIPLOMA IN PHARMACY"){
            body={
              flag: Id_Data.flag,
              recipientname: name,
              recipientmail: email,
              validity: shareValidity,
              rollno: Id_Data.certificatedata.Certificate.issuedTo.person.roll,
            }

          dispatch(shareCertificate(body))
          }else{
            body={
              recipientname: name ,
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
            certificatetype: certificateType,
            recipientname: name,
            recipientmail: email,
            validity: shareValidity,
            certificateid: Id_Data.certificateid,
          }
          dispatch(shareCertificate(body))
          setIsOpen(false);
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
  
  const handleName=(e)=>{
    let value = e.target.value
    value = value.replace(/[^A-Za-z@. ]/ig, '')
    setName(value)
  }

  const handleEmail=(e)=>{
    let value = e.target.value
    value = value.replace(/[^A-Za-z@.0-9@. ]/ig, '')
    setEmail(value)
  }
  const handleCert=(e)=>{
    let value = e.target.value
    value = value.replace(/[^A-Za-z0-9@. ]/ig, '')
    setCertType(value)
  }


  

  const  downloadPDF=()=>{
    const pdfLink = pdfData;
    const anchorElement = document.createElement('a');
    const fileName = `Document.pdf`;
    anchorElement.href = pdfLink;
    anchorElement.download = fileName;
    anchorElement.click();
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
        Swal.fire({
          icon: "success",
          title: "",
          text:"Consent added sucessfully",
          confirmButtonText: "OK",
        });

        setConsentCheck(true)
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

const setshareValidityDay = (e) =>{
  setshareValidity(e.target.value)
  const value = parseInt(e.target.value)
  var date = new Date();
  date.setDate(date.getDate() + value)

    const date1 =date.toLocaleString()
    const date2=date1.split(',')
    const date3 =date2[0].split('/')
    const date4 = date3[2]+'-'+date3[1]+'-'+date3[0]

    setcertificateExpiry(date4)
}

const handleSetData=()=>{
  setDataValue(!dataValue)
}

const handleSetData1=()=>{
  setDataValue('pdf')
}

  return (
    <div className="w-full">
      {loaderState === false ?
        <div>
          {share === false &&
            <div style={{overflowX:'hidden'}}>
                  <div className="p-2 mt-4 ml-4">

                  
                    
                    <div className=" row DocumentDetail">
                      {dataValue === "pdf" ?
                        <div className="mt-6 mb-6 col-md-12">
                          <div className='row text-start'>
                            <p><FaArrowAltCircleLeft onClick={()=>navigate(-1)} style={{fontSize:'25px'}}/></p>
                          </div>
                            <div className='row'>
                              <center>
                                <button id="Proceed_button" onClick={handleSetData}>Proceed to share your data</button>
                              </center>
                            </div>
                                  
                            <div className='row w-100' id="mobileDoc">
                              <center>
                                <Document file={`data:application/pdf;base64,${Id_Data?.certificate?.data}`}>
                                  <Page pageNumber={1} />
                                </Document>
                              </center>
                            </div>
                        </div>
                      :
                        <div className='col-md-12'>
                          

                          <div className='row text-start'>
                            <p><FaArrowAltCircleLeft onClick={handleSetData1} style={{fontSize:'25px',cursor:'pointer'}}/></p>
                          </div>
                          <div className='row w-100'>
                            <center>
                              <p style={{fontSize:'20px',fontWeight:'bold',textDecoration:'underline'}}>Certificate Data</p>
                            </center>
                          </div>
                          {Id_Data?.certificatedata?.CertificateData !== undefined ?
                              <>
                              {Dmedata === false ?
                              <div>
                                
                                  <div>
                                    {Id_Data?.certificatedata?.issuedTo?.person?.roll !== undefined ?
                                        <div className="mt-6 mb-6 ">
                                                    <div className="grid justify-end grid-cols-2 gap-8" id="certData">
                                                        <div className="grid grid-cols-2">
                                                        <div className="font-bold" id="enter">{t("Name")}</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.issuedTo.person.name !== undefined && Id_Data.certificatedata.issuedTo.person.name}</div>
                                                        </div>
                                                        <div className="grid items-end justify-end grid-cols-2">
                                                        <div className="font-bold" id="enter">{t("Roll_No")}.</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.issuedTo.person.roll !== undefined && Id_Data.certificatedata.issuedTo.person.roll}</div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                                        <div className="grid grid-cols-2">
                                                        <div className="font-bold" id="enter">{t("dob")}</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.issuedTo.person.dob !== undefined && Id_Data.certificatedata.issuedTo.person.dob}</div>
                                                        </div>
                                                        <div className="grid items-end justify-end grid-cols-2">
                                                        <div id="enter" className="font-bold">{t("Class")}</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.issuedTo.person.class !== undefined && Id_Data.certificatedata.issuedTo.person.class}</div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData" >
                                                        <div className="grid grid-cols-2">
                                                        <div className="font-bold" id="enter">{t("random")}.</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.issuedTo.person.randomNo !== undefined && Id_Data.certificatedata.issuedTo.person.randomNo}</div>
                                                        </div>
                                                        <div className="grid items-end grid-cols-2">
                                                        <div id="enter" className="font-bold">{t("Year_Passing")}</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.CertificateData.examination.year !== undefined && Id_Data.certificatedata.CertificateData.examination.year}</div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                                        <div className="grid grid-cols-2">
                                                        <div className="font-bold" id="enter">{t("month")}</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.CertificateData.examination.month !== undefined && Id_Data.certificatedata.CertificateData.examination.month}</div>
                                                        </div>
                                                        <div className="grid items-end grid-cols-2">
                                                        <div id="enter" className="font-bold">{t("tmr")}</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.CertificateData?.info?.tmrCode !== undefined && Id_Data.certificatedata.CertificateData.info.tmrCode}</div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                                        <div className="grid grid-cols-2">
                                                        <div id="enter" className="font-bold">{t("Session")}</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.CertificateData.examination?.session !== undefined && Id_Data.certificatedata.CertificateData.examination.session}</div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                        <div id="enter" className="font-bold">{t("tmrdate")}</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.CertificateData?.info?.tmrDate !== undefined && Id_Data.certificatedata.CertificateData?.info?.tmrDate}</div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                                        <div className="grid grid-cols-2">
                                                        <div id="enter" className="font-bold">{t("Med")}</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.CertificateData.school?.medium !== undefined && Id_Data.certificatedata.CertificateData.school?.medium}</div>
                                                        </div> 
                                                        <div className="grid grid-cols-2">
                                                        <div id="enter" className="font-bold">{t("Tmar")}</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.CertificateData?.performance?.marksTotal !== undefined && Id_Data.certificatedata.CertificateData.performance.marksTotal}</div>
                                                        </div> 
                                                        
                                                        
                                                    </div>
                                                    <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                                                                        
                                                        <div className="grid grid-cols-2">
                                                        <div className="font-bold" id="enter">{t("Organization")}</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: <p style={{textAlign:'justify'}}>{Id_Data.certificatedata.issuedBy?.organization?.name !== undefined && Id_Data.certificatedata.issuedBy.organization.name}</p></div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                        <div id="enter" className="font-bold">{t("School_Name")}</div>
                                                        <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.CertificateData?.school?.name !== undefined && Id_Data.certificatedata.CertificateData.school?.name}</div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="grid justify-end grid-cols-5 mt-4 mr-4" style={{backgroundColor:'#144272',marginLeft:'0px',width:'98%',padding:'5px',marginTop:'2rem'}}>
                                                        <div id="enter" className=""><p className="font-bold" style={{color:'white'}}>{t("Name")}</p></div>
                                                        <div id="enter" className=""><p className="font-bold" style={{color:'white'}}>{t("Internal")}</p></div>
                                                        <div id="enter" className=""><p className="font-bold" style={{color:'white'}}>{t("Practical")}</p></div>
                                                        <div id="enter" className=""><p className="font-bold" style={{color:'white'}}>{t("Theory")}</p></div>
                                                        <div id="enter" className=""><p className="font-bold" style={{color:'white'}}>{t("Tmar")}</p></div>
                                                                        
                                                    </div>
                                                    {Id_Data.certificatedata.CertificateData.performance !== undefined && Id_Data.certificatedata.CertificateData.performance.subjects.map((item ,index) =>(
                                                    <div className="grid justify-end grid-cols-5 mr-4" style={{marginLeft:'0px',backgroundColor: index % 2 !== 0 ? '#C3D4F9' : '',width:'98%',padding:'5px'}}>
                                                        <div className=""><p id="enterSemi" className="font-semibold" >{item.name}</p></div>
                                                        <div className=""><p id="enterSemi" className="font-semibold">{item.marksInternal}</p></div>
                                                        <div className=""><p id="enterSemi" className="font-semibold" >{item.marksPractical}</p></div>
                                                        <div className=""><p id="enterSemi" className="font-semibold" >{item.marksTheory}</p></div>
                                                        <div className=""><p id="enterSemi" className="font-semibold">{item.marksTotal}</p></div>
                                                                        
                                                    </div>
                                                    ))}

                                        </div>
                                    :
                                        <div className="mt-6 mb-6 ">
                                        <div className="grid justify-end grid-cols-2 gap-8" id="certData">
                                            <div className="grid grid-cols-2">
                                            <div className="font-bold" id="enter">{t("Name")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.IssuedTo.Person.name !== undefined && Id_Data.certificatedata.IssuedTo.Person.name}</div>
                                            </div>
                                            <div className="grid items-end justify-end grid-cols-2">
                                            <div className="font-bold" id="enter">{t("Roll_No")}.</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>:{Id_Data?.rollno}</div>
                                            </div>
                                            
                                        </div>
                                        <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                            <div className="grid grid-cols-2">
                                            <div className="font-bold" id="enter">{t("dob")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.IssuedTo.Person.dob !== undefined && Id_Data.certificatedata.IssuedTo.Person.dob}</div>
                                            </div>
                                            <div className="grid items-end justify-end grid-cols-2">
                                            <div id="enter" className="font-bold">{t("Class")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.course}</div>
                                            </div>
                                            
                                        </div>
                                        <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData" >
                                            <div className="grid grid-cols-2">
                                            <div className="font-bold" id="enter">{t("random")}.</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.IssuedTo.Person.randomNo !== undefined && Id_Data.certificatedata.IssuedTo.Person.randomNo}</div>
                                            </div>
                                            <div className="grid items-end grid-cols-2">
                                            <div id="enter" className="font-bold">{t("Year_Passing")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.CertificateData.Examination.year !== undefined && Id_Data.certificatedata.CertificateData.Examination.year}</div>
                                            </div>
                                            
                                        </div>
                                        <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                            <div className="grid grid-cols-2">
                                            <div className="font-bold" id="enter">{t("month")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.CertificateData.Examination.month !== undefined && Id_Data.certificatedata.CertificateData.Examination.month}</div>
                                            </div>
                                            <div className="grid items-end grid-cols-2">
                                            <div id="enter" className="font-bold">{t("tmr")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.CertificateData?.info?.tmrCode !== undefined && Id_Data.certificatedata.CertificateData.info.tmrCode}</div>
                                            </div>
                                            
                                        </div>
                                        <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                                                            
                                            <div className="grid grid-cols-2">
                                            <div className="font-bold" id="enter">{t("Organization")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: <p style={{textAlign:'justify'}}>{Id_Data.certificatedata.IssuedBy?.Organization?.name !== undefined && Id_Data.certificatedata.IssuedBy.Organization.name}</p></div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                            <div id="enter" className="font-bold">{t("School_Name")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.CertificateData?.School?.name !== undefined && Id_Data.certificatedata.CertificateData.School?.name}</div>
                                            </div>
                                            
                                        </div>

                                        </div>
                                    }
                                  </div>
                              </div>
                              :
                                  <div className="mt-6 mb-6 ">
                                  <div className="grid justify-end grid-cols-2 gap-8" id="certData">
                                  <div className="grid grid-cols-2">
                                      <div className="font-bold" id="enter">{t("Name")}</div>
                                      <div id="enterSemi" style={{wordBreak:'break-all'}}>:{Id_Data?.certificatedata?.IssuedTo?.Person?.name}</div>
                                  </div>
                                  <div className="grid items-end justify-end grid-cols-2" >
                                      <div className="font-bold" id="enter">{t("Roll_No")}.</div>
                                      <div id="enterSemi" style={{wordBreak:'break-all'}}>: { Id_Data?.rollno}</div>
                                  </div>
                                  
                                  </div>
                                  <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                  <div className="grid grid-cols-2">
                                      <div className="font-bold" id="enter">{t("DOB")}</div>
                                      <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.IssuedTo?.Person?.dob}</div>
                                  </div>
                                  <div className="grid items-end justify-end grid-cols-2">
                                      <div id="enter" className="font-bold">{t("Class")}</div>
                                      <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.course}</div>
                                  </div>
                                  
                                  </div>
                                  <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                  <div className="grid grid-cols-2">
                                      <div className="font-bold" id="enter">{t("docReg")}.</div>
                                      <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.number}</div>
                                  </div>
                                  <div className="grid items-end grid-cols-2">
                                      <div id="enter" className="font-bold">{t("Year_Passing")}</div>
                                      <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.CertificateData?.Examination.year}</div>
                                  </div>
                                  
                                  </div>
                                  <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                  <div className="grid grid-cols-2">
                                      <div className="font-bold" id="enter">{t("month")}</div>
                                      <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.CertificateData?.Examination.month}</div>
                                  </div>
                                  

                                  
                                  </div>
                                  
                                  <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                                                      
                                  <div className="grid grid-cols-2">
                                      <div className="font-bold" id="enter">{t("Organization")}</div>
                                      <div id="enterSemi" style={{wordBreak:'break-all'}}><p style={{textAlign:'justify'}}>{Id_Data?.certificatedata?.IssuedBy.Organization.name}</p></div>
                                  </div>
                                  <div className="grid grid-cols-2">
                                      <div id="enter" className="font-bold">{t("School_Name")}</div>
                                      <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.CertificateData?.School.name}</div>
                                  </div>
                                  
                                  </div>

                                  </div>
                              }
                              </>
                          :
                              <div>
                                {Id_Data.certificatedata.Certificate !== undefined ?
                                  <div>                                
                                    <div>
                                      <div className="mt-6 mb-6 ">
                                        <div className="grid justify-end grid-cols-2 gap-8" id="certData">
                                            <div className="grid grid-cols-2">
                                            <div className="font-bold" id="enter">{t("Name")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.issuedTo.person.name !== undefined && Id_Data.certificatedata.Certificate.issuedTo.person.name}</div>
                                            </div>
                                            <div className="grid items-end justify-end grid-cols-2">
                                            <div className="font-bold" id="enter">{t("Roll_No")}.</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.issuedTo.person.roll !== undefined && Id_Data.certificatedata.Certificate.issuedTo.person.roll}</div>
                                            </div>
                                        </div>
                                        <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                            <div className="grid grid-cols-2">
                                            <div className="font-bold" id="enter">{t("dob")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.issuedTo.person.dob !== undefined && Id_Data.certificatedata.Certificate.issuedTo.person.dob}</div>
                                            </div>
                                            <div className="grid items-end justify-end grid-cols-2">
                                            <div id="enter" className="font-bold">{t("Class")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.issuedTo.person.class !== undefined && Id_Data.certificatedata.Certificate.issuedTo.person.class}</div>
                                            </div>
                                            
                                        </div>
                                        <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData" >
                                            <div className="grid grid-cols-2">
                                            <div className="font-bold" id="enter">{t("random")}.</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.issuedTo.person.randomNo !== undefined && Id_Data.certificatedata.Certificate.issuedTo.person.randomNo}</div>
                                            </div>
                                            <div className="grid items-end grid-cols-2">
                                            <div id="enter" className="font-bold">{t("Year_Passing")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.CertificateData.examination.year !== undefined && Id_Data.certificatedata.Certificate.CertificateData.examination.year}</div>
                                            </div>
                                            
                                        </div>
                                        <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                            <div className="grid grid-cols-2">
                                            <div className="font-bold" id="enter">{t("month")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.CertificateData.examination.month !== undefined && Id_Data.certificatedata.Certificate.CertificateData.examination.month}</div>
                                            </div>
                                            <div className="grid items-end grid-cols-2">
                                            <div id="enter" className="font-bold">{t("tmr")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.CertificateData?.info?.tmrCode !== undefined && Id_Data.certificatedata.Certificate.CertificateData.info.tmrCode}</div>
                                            </div>
                                            
                                        </div>
                                        <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                            <div className="grid grid-cols-2">
                                            <div id="enter" className="font-bold">{t("Session")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.CertificateData.examination?.session !== undefined && Id_Data.certificatedata.Certificate.CertificateData.examination.session}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                            <div id="enter" className="font-bold">{t("tmrdate")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.CertificateData?.info?.tmrDate !== undefined && Id_Data.certificatedata.Certificate.CertificateData?.info?.tmrDate}</div>
                                            </div>
                                            
                                        </div>
                                        <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                            <div className="grid grid-cols-2">
                                            <div id="enter" className="font-bold">{t("Med")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.CertificateData.school?.medium !== undefined && Id_Data.certificatedata.Certificate.CertificateData.school?.medium}</div>
                                            </div> 
                                            <div className="grid grid-cols-2">
                                            <div id="enter" className="font-bold">{t("Tmar")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.CertificateData?.performance?.marksTotal !== undefined && Id_Data.certificatedata.Certificate.CertificateData.performance.marksTotal}</div>
                                            </div> 
                                            
                                            
                                        </div>
                                        <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                                                            
                                            <div className="grid grid-cols-2">
                                            <div className="font-bold" id="enter">{t("Organization")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: <p style={{textAlign:'justify'}}>{Id_Data.certificatedata.Certificate.issuedBy?.organization?.name !== undefined && Id_Data.certificatedata.Certificate.issuedBy.organization.name}</p></div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                            <div id="enter" className="font-bold">{t("School_Name")}</div>
                                            <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data.certificatedata.Certificate.CertificateData?.school?.name !== undefined && Id_Data.certificatedata.Certificate.CertificateData.school?.name}</div>
                                            </div>
                                            
                                        </div>
                                        <div className="grid justify-end grid-cols-5 mt-4 mr-4" style={{backgroundColor:'#144272',marginLeft:'0px',width:'98%',padding:'5px',marginTop:'2rem'}}>
                                            <div id="enter" className=""><p className="font-bold" style={{color:'white'}}>{t("Name")}</p></div>
                                            <div id="enter" className=""><p className="font-bold" style={{color:'white'}}>{t("Internal")}</p></div>
                                            <div id="enter" className=""><p className="font-bold" style={{color:'white'}}>{t("Practical")}</p></div>
                                            <div id="enter" className=""><p className="font-bold" style={{color:'white'}}>{t("Theory")}</p></div>
                                            <div id="enter" className=""><p className="font-bold" style={{color:'white'}}>{t("Tmar")}</p></div>
                                                            
                                        </div>
                                        {Id_Data.certificatedata.Certificate.CertificateData.performance !== undefined && Id_Data.certificatedata.Certificate.CertificateData.performance.subjects.map((item ,index) =>(
                                        <div className="grid justify-end grid-cols-5 mr-4" style={{marginLeft:'0px',backgroundColor: index % 2 !== 0 ? '#C3D4F9' : '',width:'98%',padding:'5px'}}>
                                            <div className=""><p id="enterSemi" className="font-semibold" >{item.name}</p></div>
                                            <div className=""><p id="enterSemi" className="font-semibold">{item.marksInternal}</p></div>
                                            <div className=""><p id="enterSemi" className="font-semibold" >{item.marksPractical}</p></div>
                                            <div className=""><p id="enterSemi" className="font-semibold" >{item.marksTheory}</p></div>
                                            <div className=""><p id="enterSemi" className="font-semibold">{item.marksTotal}</p></div>
                                                            
                                        </div>
                                        ))}

                                      </div>
                                    </div>
                                  </div>
                                :
                                  <div className="mt-6 mb-6" style={{width:'97%'}}>
                                              <div className="grid justify-end grid-cols-2 gap-8" id="certData">
                                              <div className="grid grid-cols-2">
                                                  <div className="font-bold" id="enter">{t("Name")}</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.['APPLICANT NAME']}</div>
                                              </div>
                                              <div className="grid items-end grid-cols-2">
                                                  <div id="enter" className="font-bold">{t("No")}.</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.CERTIFICATENO}</div>
                                              </div>
                                              
                                              
                                              </div>
                                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                              <div className="grid grid-cols-2">
                                                  <div id="enter" className="font-bold">{t("exp")}</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.['DATE OF EXPIRY']}</div>
                                              </div>
                                              <div className="grid items-end grid-cols-2">
                                                  <div id="enter" className="font-bold">{t("DI")}</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.['DATE OF ISSUE']}</div>
                                              </div>
                                              
                                              </div>
                                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                              <div className="grid grid-cols-2">
                                                  <div id="enter" className="font-bold">{t("District")}</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.DISTRICT}</div>
                                              </div>
                                              <div className="grid items-end grid-cols-2">
                                                  <div id="enter" className="font-bold">{t("Father")}</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.['FATHER/HUSBAND NAME']}</div>
                                              </div>
                                              
                                              </div>
                                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                              <div className="grid grid-cols-2">
                                                  <div id="enter" className="font-bold">{t("Pincode")}</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.PINCODE?.length !== 0 && Id_Data?.certificatedata?.PINCODE}</div>
                                              </div>
                                              <div className="grid items-end grid-cols-2">
                                                  <div id="enter" className="font-bold">{t("serName")}</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.PINCODE}</div>
                                              </div>
                                              
                                              </div>
                                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                              <div className="grid grid-cols-2">
                                                  <div id="enter" className="font-bold">{t("Taluk")}</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.TALUK}</div>
                                              </div>
                                              <div className="grid items-end grid-cols-2">
                                                  <div id="enter" className="font-bold">{t("vill")}</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.['VILLAGE/TOWN']}</div>
                                              </div>
                                              
                                              </div>
                                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                              <div className="grid grid-cols-2">
                                                  <div id="enter" className="font-bold">{t("Issuing_Authority")}</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.certificatedata?.['ISSUING AUTHORITY']}</div>
                                              </div>

                                              <div className="grid justify-end grid-cols-2">
                                                  <div id="enter"className="font-bold">{t("NAd")}.</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>:{Id_Data?.certificatedata?.['AADHAR NO']}</div>
                                              </div>                      
                                              </div>
                                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                              
                                              <div className="grid grid-cols-2">
                                                  <div id="enter" className="font-bold">{t("Address")}</div>
                                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: { Id_Data?.certificatedata?.ADDRESS}</div>
                                              </div>  
                                              
                                              </div>
                                              

                                  </div>
                                }
                              </div>
                          }

                          <div>
                            <div className='' style={{display:'flex'}}>
                              <input type="checkbox" checked={consentCheck} onClick={openConsent} /><p style={{marginLeft:'10px'}}>{t("hereby")}.</p>
                            </div>
                          </div>
                          <div className="flex" style={{marginBottom:'90px',marginTop:'2rem'}} id="downloadButton">
                            <button onClick={()=>downloadPDF()} style={{background:'#154272',border:'1px solid #457fca',borderRadius:'7px',color:'white',padding:'5px 20px',cursor:'pointer',fontWeight:'600'}}>
                                {t("down")}
                            </button>
                            <a href className="px-4 py-2 ml-4 font-bold text-white" id="enter" onClick={openModal} style={{backgroundColor:'#154272',borderRadius:'7px',cursor:'pointer',fontWeight:'600'}}>{t("Share")}</a>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
            </div>
          }
        </div>
      :
        <div>
          <center><img className='mt-4' src={loader} alt=""/></center>
        </div>
      }

      <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="flex grid-cols-2" style={{backgroundColor:'#144272'}}>
                <div className="" style={{display: 'flex',width:'90%'}}>
                    <img alt='' src={logo} style={{width:'50px',marginTop:'3px',marginBottom:'3px',marginLeft:'5%'}}/>
                    <p id="enter" style={{color:'#FFFFFF',marginTop:'20px',marginLeft:'20px',fontWeight:'bold',fontSize:'18px'}}>{t("portal")}</p> 
                </div>
                <div className="mt-2">
                    <a href style={{fontWeight:'bold',marginTop:'20px',fontSize:'24px',cursor:'pointer',textAlign:'right',color:'white',marginLeft:'90%'}} onClick={() => setIsOpen(false)}>X</a>
                </div>
              </div>
              <div className="flex grid grid-cols-2 mt-6">
                <label className="text-base font-bold">{t("Name")}</label>
                <label className="text-base font-bold">{t("Email")}</label> 
              </div>
              <div className="flex grid grid-cols-2">
                <input className="mt-2 border-2 border-solid rounded " placeholder='Eg:- xyz' style={{width:'250px',backgroundColor:'#FBFBFE',padding:'5px'}}
                
                onChange={handleName}
                 value={name}/>
                <input type="email" className="mt-2 border-2 border-solid rounded " placeholder='Eg:- xyz@gmail.com' style={{width:'250px',backgroundColor:'#FBFBFE',padding:'5px'}}
                onChange={handleEmail} value={email}/>
              </div>
              <div className="flex grid grid-cols-2 mt-4 " >
                <label className="text-base font-bold">Certificate Type</label>
              </div>
              <div className="flex grid grid-cols-2">
                <input onChange={(e)=>setCertificateType(e.target.value)} value={certificateType} className="mt-2 border-2 border-solid rounded " placeholder='Eg:- Income certificate' style={{width:'250px',backgroundColor:'#FBFBFE',padding:'5px'}}/>
                
              </div>
              <div>
                <div>
                  {shareLoader === false ?
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
                    <img src={loader} style={{width:'30px',marginLeft:'85%',marginTop:'1rem'}} alt='' />
                  }
                  </div>

              </div>
      </Modal>
    </div>
  )
}

export default DocumentScreen
