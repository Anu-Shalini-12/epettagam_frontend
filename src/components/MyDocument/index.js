import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import user from '../../Assets/Group 1 (1).png'
import logo1 from '../../Assets/Mask_Group_1.png'
import logo2 from '../../Assets/TNeGA_logo.png'
import { Tab } from '@headlessui/react'
import { getEduCert,getSevCert ,getDmecert} from '../store/certificates/action'
import { shareCertificate } from '../store/esevai/action'
import axios from 'axios'
import {pdfjs } from 'react-pdf'
import Modal from 'react-modal';
import logo from '../../Assets/Mask_Group_1.png'
import { FaArrowLeft } from "react-icons/fa";
import loader from "../../Assets/Rolling-1s-200px.gif"
import Swal from "sweetalert2";
import { BsFillEyeFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { useNavigate,useLocation } from 'react-router-dom';
import { BASE_URL } from "../../components/utilities/config"; 
import Base64ImageDisplay from "../CertificateScreen/Base64ImageDisplay"
import "../../style/components/walletScreen.css"
import dateFormat from 'dateformat';


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
function MyDocument() {
  const location = useLocation();
  const navigate = useNavigate()
  const { t, i18n } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [share] = useState(false)
  const [Id_Data,setData] = useState('')
  const [pdfData,setPdf] = useState('')
  const [firstData, setFirstData] = useState(true)
  const [certType,setCertType] = useState('')
  const [consentpop,setconsentpop] = useState(false)
  const [Dmedata,setDmeData] = useState(false)
  const [email,setEmail] = useState('')
  const [view, setView] = useState(false)
  let loginData = useSelector((store) => store.certificate.otp_verification)
  let EduCert = useSelector((store) => store.certificate.getAll_educert.data) 
  let SevCert = useSelector((store) => store.certificate.getAll_sevcert.data)
  let DmeCert = useSelector((store) => store.certificate.dmeList.data)
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [ConsentData,setConsent] = React.useState(false)
  const [regData,setRegData] = useState(undefined)
  const [tab,settab] = useState(1)
  const [selectedData,setSelectedData] = useState("Educatiion Cerificate")

  useEffect(()=>{
    if(DmeCert !== undefined){
      for(var i=0;i<DmeCert.length;i++){
        
      }
    }
  },[DmeCert])

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
  const dispatch = useDispatch()
  const EsevaiCertTab = () => {
    settab(2)
    if(tab !== 2){
      dispatch(getEduCert()) 
    }
  }
  const EduCertTab = () => {
    settab(1)
    if(tab !== 1){
     dispatch(getSevCert(sessionStorage.getItem('user')))
    }
  }

  const RegistrationCertTab=()=>{
    settab(3)
    if(tab !== 3){
      axios.get(`${BASE_URL}rg/wallet/getcert`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
        },
      }).then((res)=>{
        setRegData(res.data.data)   
      }).catch((err)=>{      
        Swal.fire({
          icon: "error",
          title: "",
          text: err.response.data.message,
          confirmButtonText: "OK",
        });
      })
    }
  }


  if(firstData === true){
    // eslint-disable-next-line no-lone-blocks
    {loginData !== '' &&
      dispatch(getSevCert(sessionStorage.user))
      dispatch(getEduCert()) 
      dispatch(getDmecert())
      axios.get(`${BASE_URL}rg/wallet/getcert`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
        },
      }).then((res)=>{
        setRegData(res.data.data)    
      }).catch((err)=>{
       
      })
      setFirstData(false)
    }
  }
  

  const ViewAction = (data,data1) => {
    if(data1 === 'dme'){
      setDmeData(true)
    }
    setView(true)
    setData(data)
    const pdf='data:image/png;base64,'+data.certificate.data 
    setPdf(pdf)
  }

const ViewActionReg=(data)=>{
    navigate("/MyDocument/Register_document_RegCert",{state:{data:data}})
}

const ViewDME=(data,data1)=>{
  navigate("/MyDocument/Register_document_DmeCert",{state:{data:data,screen:data1}})
}

const TotalCert= (SevCert !== undefined ? SevCert.length : 0) + (EduCert !== undefined ? EduCert.length : 0) + (DmeCert !== undefined ?  DmeCert.length : 0) + (regData !== undefined ? regData.length :0)
 

const handleSelect=(e)=>{
  setSelectedData(e.target.value)
  if(e.target.value === "Education Certificates"){
    settab(1)
    dispatch(getSevCert(sessionStorage.getItem('user')))
  }
  if(e.target.value === "Tamil Nadu Government Certificate"){
    settab(2)
    dispatch(getSevCert(sessionStorage.getItem('user')))
  }
  if(e.target.value === "Registration Certificate"){
    settab(3)
    axios.get(`${BASE_URL}rg/wallet/getcert`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    }).then((res)=>{
      setRegData(res.data.data)   
    }).catch((err)=>{    
      Swal.fire({
        icon: "error",
        title: "",
        text: err.response.data.message,
        confirmButtonText: "OK",
      });
    })
  }
  
}

  return (
    <div className="w-full" id="main_body" >
      <div style={{overflowY:'hidden'}} id="Wallet_Screen">
          <div style={{overflowY:'hidden'}}>
            <div className="flex h-32 border-2 " id="lengthdefine" style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',height:'fit-content',marginLeft:'1%',borderRadius:'10px'}}>
              <div>
                <img alt='' src={user} className="mt-2 ml-4 " id="documentLogo" />
              </div>
              <div className="mt-3 ml-10" id="enter">
                {loginData !== '' &&
                <>
                  <p className="font-bold" id="enterText">{sessionStorage.username}</p>
                  <p>{t("Total")}: &nbsp; <span style={{color:'#4984CA',fontSize:'20px'}}>0{TotalCert} </span></p>
                </>
                }
              </div>
            </div>
            <div className="mt-12 " text-1xl
            style={{
              width:'96%',marginLeft:'2%',borderRadius:'10px'}}
            >
        
              <div className="justify-center ">
                <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                  <div className="flex justify-start w-full m-2">
                    <Tab.List className="space-x-4" style={{display:'flex'}}>
                      <Tab 
                      style={{borderBottom: selectedIndex === 0 ? ' 5px solid #154272': '',borderRadius:'5px',outline:'none',width:'230px'}}
                      className={({ selected }) =>selected ? ' text-white ' : 'bg-white text-black rounded-xl'}
                      >
                        <div className="flex py-2">
                          <a href onClick={EduCertTab} className="flex">
                            <img alt='' src={logo1} className="" style={{width:'50px'}}/><p className="mt-2 font-bold" id="enter" style={{fontSize:'15px',color: selectedIndex === 0 ? 'black' : '',width:'164px'}} >{t("tn1")}</p>
                          </a>
                        </div>
                      </Tab>
                      <Tab className={({ selected }) =>selected ? ' text-white ' : 'bg-white text-black rounded-xl'} 
                      style={{borderBottom: selectedIndex === 1 ? ' 5px solid #154272': '',borderRadius:'5px',outline:'none',width:'335px'}}>
                        <div className="flex py-2">
                          <a href onClick={EsevaiCertTab} className="flex">
                            <img alt='' src={logo2} className="" style={{width:'50px'}}/><p className="mt-2 font-bold" id="enter" style={{fontSize:'15px',color: selectedIndex === 1 ? 'black' : '',width:'270px'}}> {t("slide2Title")}</p>
                          </a>
                        </div>
                      </Tab>
                    </Tab.List>
                  </div>
                  <Tab.Panels>
                    <Tab.Panel>
                      {SevCert !== undefined ?
                      <> 
                      {DmeCert !== undefined && DmeCert.map((item) => (
                          <>
                            <div className="grid grid-cols-4 mt-4 border-2 " onClick={() => ViewDME(item,"DME")} id="lengthdefine" style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',marginLeft:'1%',marginBottom:'0rem',borderRadius:'10px'}}>
                              <div className="">
                                <div style={{height:'100px',marginLeft:'20%',marginTop:'5%'}}>
                                  <embed 
                                    src={`data:application/pdf;base64,${item.certificate.data}`} height={80} width={80} />
                                </div>
                              </div>
                              <div className="mt-4">
                                <p id="enter">{t("sheet")}. : <span style={{color:'#144272',fontSize:'15px'}}>{item?.rollno}</span></p>                                  
                                  <p style={{color:'#959595',fontSize:'15px'}} id="enterSemi">{t("Name")}: {item?.certificatedata?.IssuedTo?.Person?.name}</p>
                                
                              </div>
                              <div>
                                {item.certificatedata.name !== undefined &&
                                  <p style={{marginTop:'20px',fontSize:'15px'}}>{item.certificatedata.name}</p>
                                }
                                <p id="enter"> Added On:</p>
                                <p id="enter"><span style={{color:'#144272',fontSize:'15px'}}>
                                  {dateFormat(item.createdAt, "mmmm dS, yyyy")}
                                </span></p>
                              </div>
                              <div className="grid grid-cols-2 mt-4">
                                <a href style={{width:'100px',cursor:'pointer'}}>
                                  <BsFillEyeFill style={{fontSize:'25px',color:'#154272',marginLeft:'30px'}}/> <a href id="enter" style={{fontSize:'15px'}}>View / Share</a>
                                </a>
                              </div>
                            </div>
                          </>
                        ))}
                      
                        {SevCert.map((item) => (
                          <>
                            <div className="grid grid-cols-4 mt-4 border-2 " onClick={() => ViewDME(item,'edu')} id="lengthdefine" style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',marginLeft:'2%',marginBottom:'0rem',borderRadius:'10px'}}>
                              <div className="">
                                <div style={{height:'100px',marginLeft:'20%',marginTop:'5%'}}>
                                  <embed 
                                    src={`data:application/pdf;base64,${item.certificate.data}`} height={80} width={80} />
                                </div>
                              </div>
                              <div className="mt-4">
                                <p id="enter" style={{fontSize:'15px'}}>{t("sheet")} : <span style={{color:'#144272',fontSize:'15px'}}>{item.certificatedata?.Certificate !== undefined ? item.certificatedata.Certificate.issuedTo.person.roll : item.rollno}</span></p>
                                {item.certificatedata?.Certificate !== undefined ?
                                  <p style={{color:'#959595',fontSize:'14px'}} id="enterSemi">{t("Name")}: {item.certificatedata.Certificate.issuedTo.person.name}</p>
                                  :
                                  <p style={{color:'#959595',fontSize:'14px'}} id="enterSemi">{t("Name")}: {item.certificatedata.name}</p>
                                }
                              </div>
                              <div className='ml-5'>
                                {item.certificatedata.INSTNAME !== undefined &&
                                  <p style={{fontSize:'15px'}}>{item.certificatedata.INSTNAME[0]}</p>
                                }
                                <p className='mt-4' id="enter" style={{fontSize:'15px'}}>Added On:</p>

                                <p id="enter"><span style={{color:'#144272',fontSize:'15px'}}>
                                  {dateFormat(item.createdAt, "mmmm dS, yyyy")}
                                  </span></p>
                              </div>
                              <div className="grid grid-cols-2 mt-4">
                                <a href onClick={() => ViewDME(item,'edu')} style={{width:'150px',cursor:'pointer'}}>
                                  <BsFillEyeFill style={{fontSize:'25px',color:'#154272',marginLeft:'30px'}}/>   <a href id="enter" style={{fontSize:'15px'}}>{t("view")}</a>
                                </a>
                              </div>
                            </div>
                          </>
                        ))}

                        {SevCert?.length === 0 && DmeCert?.length === 0 &&
                          <div style={{marginTop:'5rem'}}>
                          <center>
                            <label style={{color:'#154272',fontSize:'25px',fontWeight:'bold'}}>{t("record")}</label>
                          </center>
                        </div>                         
                        }
                      </>
                      :
                      <>
                      <center>
                        <img alt='' src={loader} style={{width:'150px',marginTop:'2rem'}}/>
                      </center>
                      <center>Loading...</center>
                      </>
                                
                      }
                    </Tab.Panel>
                    <Tab.Panel>
                      {EduCert !== undefined ?
                        <>
                          {EduCert.length !== 0 ?
                            <>
                              {EduCert.map((item) => (
                                <>
                          
                                  <div className="grid grid-cols-4 mt-4 border-2 rounded-xl" onClick={() => ViewDME(item,'ese')} id="lengthdefine" style={{marginLeft:'1%',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',marginBottom:'0rem',borderRadius:'10px'}}>
                                    <div className="">
                                      <div style={{height:'100px',marginLeft:'20%',marginTop:'5%'}}>
                                        <embed
                                          src={`data:application/pdf;base64,${item.certificate.data}`}
                                          height={80}
                                          width={80}
                                        />
                                      </div>
                                    </div>
                                    <div className="mt-4">
                                      <p id="enter" style={{fontSize:'15px'}}>{t("added")}</p>
                                      
                                  <p id="enter"><span style={{color:'#144272',fontSize:'15px'}}>
                                    {dateFormat(item.createdAt, "mmmm dS, yyyy")}
                                    </span></p>
                                    </div>
                                    <div className="mt-4">
                                      <p id="enter" style={{fontSize:'15px'}}>{t("Number")}:</p>
                                      <p id="enter" style={{fontSize:'15px',color:'#144272'}}>{item.certificatedata['CERTIFICATENO']}</p>
                                    </div>
                                    <div className="grid grid-cols-2 mt-4">
                                      <a href style={{width:'150px',cursor:'pointer'}}>
                                        <BsFillEyeFill style={{fontSize:'25px',color:'#154272',marginLeft:'30px'}}/>
                                        <a href id="enterSemi" style={{fontSize:'15px'}}>{t("view")}</a> 
                                      </a>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </>
                          :
                              <div style={{marginTop:'5rem'}}>
                                <center>
                                  <label style={{color:'#154272',fontSize:'25px',fontWeight:'bold'}}>{t("record")}</label>
                                </center>
                              </div>
                          }
                        </>
                      :
                      <>
                        <center>
                          <img alt='' src={loader} style={{width:'150px',marginTop:'2rem'}}/>
                        </center>
                        <center>Loading....</center>
                      </>
                      }
                    </Tab.Panel>
                    <Tab.Panel>
                      {regData !== undefined && regData.length !== 0 ?
                      <>
                        {regData.map((item)=>(
                              <div className="grid grid-cols-4 mt-4 border-2 rounded-xl" onClick={() => ViewActionReg(item)} id="lengthdefine" style={{marginLeft:'1%',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',marginBottom:'0rem',borderRadius:'10px'}}>
                              
                              <div className="">
                                <div style={{height:'100px',marginLeft:'20%',marginTop:'5%'}}>
                                  <embed
                                    src={`data:application/pdf;base64,${item.certificate.data}`}
                                    height={80}
                                    width={80}
                                  />
                                </div>
                              </div>
                              <div className="mt-4">
                                <p id="enter" style={{fontSize:'15px',fontWeight:'bold',color:'#144272'}}>{t("added")}</p>
                                
                                <p id="enter" style={{fontSize:'15px',fontWeight:'bold',color:'#144272'}}>{item.createdAt.split('T')[0]}</p> 
                              </div>
                              <div className="mt-4">
                                <p id="enter" style={{fontSize:'15px',fontWeight:'bold',color:'#144272'}}>{item?.certificatedata?.name}</p>
                                <p id="enter" style={{fontSize:'15px',fontWeight:'bold',color:'#144272'}}>{item?.certificatedata?.number}</p>
                              </div>
                              <div className="grid grid-cols-2 mt-4">
                                <a href  style={{width:'150px',cursor:'pointer'}}>
                                  <BsFillEyeFill style={{fontSize:'25px',color:'#154272',marginLeft:'30px'}}/>
                                  <a href id="enterSemi">{t("view")}</a>
                                </a>
                              </div>
                            </div>
                        ))}
                      </>
                    :
                      <div style={{marginTop:'5rem'}}>
                                <center>
                                  <label style={{color:'#154272',fontSize:'25px',fontWeight:'bold'}}>{t("record")}</label>
                                </center>
                              </div>
                      }
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>      
      </div>
      <div id="Ipad_Screen">
        <div className="flex h-32 border-2 " id="lengthdefine1" style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',height:'fit-content',marginLeft:'1%',borderRadius:'10px'}}>
          <div>
            <img alt='' src={user} className="mt-2 ml-4 " id="documentLogo" />
          </div>
          <div className="mt-3 ml-10" id="enter">
            {loginData !== '' &&
            <>
              <p className="font-bold" id="enterText">{sessionStorage.username}</p>
              <p>{t("Total")}: &nbsp; <span style={{color:'#4984CA',fontSize:'20px'}}>0{TotalCert} </span></p>
            </>
            }
          </div>
        </div>

        <select value={selectedData} id="selectButton" onChange={handleSelect} style={{border:'2px solid grey',marginTop:'2rem',padding:'5px 40px',borderRadius:'11px'}}>
          <option value="Education Certificates">Education Certificates</option>
          <option value="Tamil Nadu Government Certificate">Tamil Nadu Government Certificate</option>
          <option value="Registration Certificate">Registration Certificate</option>
        </select>
        
        {tab === 1 &&
          <div className=' row' id="rowPad" >
            {SevCert !== undefined ?
              <> 
                {DmeCert !== undefined && DmeCert.map((item) => (
                  <div className="col-md-6" style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',marginLeft:'',marginBottom:'0rem',borderRadius:'10px',padding:'10px'}}>
                    <center>
                      <div style={{height:'100px',marginLeft:'20%',marginTop:'5%'}}>
                        <embed src={`data:application/pdf;base64,${item.certificate.data}`} height={80} width={80} />
                      </div>
                      <div className='row d-flex'>
                      <div className="mt-4 w-50">
                        {item.certificatedata.name !== undefined &&
                          <p style={{marginTop:'0px'}}>{item.certificatedata.name}</p>
                        }
                        <p id="enter">Added On:</p>
                        <p id="enter"><span style={{color:'#144272'}}>
                                    {dateFormat(item.createdAt, "mmmm dS, yyyy")}
                                    </span></p>
                      </div>
                      <div className="mt-4 w-50">
                        <p id="enter">{t("sheet")}. : <span style={{color:'#144272'}}>{item?.rollno}</span></p>                                  
                          <p style={{color:'#959595',fontSize:'12px'}} id="enterSemi">{t("Name")}: {item?.certificatedata?.IssuedTo?.Person?.name}</p>
                        
                      </div>
                      </div>
                      <div className="grid grid-cols-2 mt-4">
                        <button onClick={() => ViewDME(item,"DME")} style={{border:'2px solid #144272', padding:'5px 15px',borderRadius: '10px',backgroundColor:'#144272',color:'white',marginTop:'10px',marginLeft:'70%',fontWeight:'bold',width:'fit-content'}}>View</button>
                      </div>
                    </center>
                  </div>
                ))}
              
                {SevCert.map((item) => (
                  <>
                    <div className="col-md-5"  id="lengthdefine" style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',marginLeft:'',marginBottom:'0rem',borderRadius:'10px',padding:'10px'}}>
                      <div className="">
                        <div style={{height:'100px',marginLeft:'20%',marginTop:'5%'}}>
                          <embed 
                            src={`data:application/pdf;base64,${item.certificate.data}`} height={80} width={80} />
                        </div>
                      </div>
                      <div>
                        {item.certificatedata.INSTNAME !== undefined &&
                          <p>{item.certificatedata.INSTNAME[0]}</p>
                        }
                        <p id="enter">Added On:</p>
                        <p id="enter"><span style={{color:'#144272'}}>
                                    {dateFormat(item.createdAt, "mmmm dS, yyyy")}
                                    </span></p>
                      
                      <div className="mt-4">
                        <p id="enter">{t("sheet")}. : <span style={{color:'#144272'}}>{item.certificatedata?.Certificate !== undefined ? item.certificatedata?.Certificate.issuedTo.person.roll : item.rollno}</span></p>
                        {item.certificatedata?.Certificate !== undefined ?
                          <p style={{color:'#959595',fontSize:'12px'}} id="enterSemi">{t("Name")}: {item.certificatedata?.Certificate.issuedTo.person.name}</p>
                          :
                          <p style={{color:'#959595',fontSize:'12px'}} id="enterSemi">{t("Name")}: {item.certificatedata.name}</p>
                        }
                      </div>
                      </div>
                      <div className="grid grid-cols-2 mt-4">
                      <button onClick={() => ViewDME(item,"edu")} style={{border:'2px solid #144272', padding:'5px 15px',borderRadius: '10px',backgroundColor:'#144272',color:'white',marginTop:'10px',marginLeft:'70%',fontWeight:'bold',width:'fit-content'}}>View</button>
                      </div>
                    </div>
                  </>
                ))}

                {SevCert?.length === 0 && DmeCert?.length === 0 &&
                  <div style={{marginTop:'5rem'}}>
                  <center>
                    <label style={{color:'#154272',fontSize:'25px',fontWeight:'bold'}}>{t("record")}</label>
                  </center>
                </div>                         
                }
              </>
              :
              <>
              <center>
                <img alt='' src={loader} style={{width:'150px',marginTop:'2rem'}}/>
              </center>
              <center>Loading...</center>
              </>                    
            }
          </div>
        }

        {tab === 2 &&
          <div className=' row' id="rowPad">
            {EduCert !== undefined ?
              <>
                {EduCert.length !== 0 ?
                  <>
                    {EduCert.map((item) => (
                      <>
                
                        <div className='col-md-6' style={{marginLeft:'0%',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',marginBottom:'4rem',borderRadius:'10px',padding:'10px'}}>
                          <div className="">
                            <div style={{height:'100px',marginLeft:'20%',marginTop:'5%'}}>
                              <embed
                                src={`data:application/pdf;base64,${item.certificate.data}`}
                                height={80}
                                width={80}
                              />
                            </div>
                          </div>
                          <div className='row d-flex'>
                            <div className="mt-4 w-50">
                              <p id="enter" style={{fontSize:'15px',fontWeight:'bold',color:'#144272'}}>{t("added")}</p>
                              
                              <p id="enter" style={{fontSize:'15px',fontWeight:'bold',color:'#144272'}}>{item.createdAt.split('T')[0]}</p> 
                            </div>
                            <div className="mt-4 w-50">
                              <p id="enter" style={{fontSize:'15px',fontWeight:'bold',color:'#144272'}}>{t("Number")}</p>
                              <p id="enter" style={{fontSize:'15px',fontWeight:'bold',color:'#144272'}}>{item.certificatedata['CERTIFICATENO']}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 mt-4">                            
                            <button onClick={() => ViewDME(item,"edu")} style={{border:'2px solid #144272', padding:'5px 15px',borderRadius: '10px',backgroundColor:'#144272',color:'white',marginTop:'10px',marginLeft:'70%',fontWeight:'bold',width:'fit-content'}}>View</button>
                         </div>
                        </div>
                      </>
                    ))}
                  </>
                :
                    <div style={{marginTop:'5rem'}}>
                      <center>
                        <label style={{color:'#154272',fontSize:'25px',fontWeight:'bold'}}>{t("record")}</label>
                      </center>
                    </div>
                }
              </>
            :
              <>
                <center>
                  <img alt='' src={loader} style={{width:'150px',marginTop:'2rem'}}/>
                </center>
                <center>Loading....</center>
              </>
            }
          </div>
        }

        {tab === 3 &&
          <div className=' row' id="rowPad">
              {regData !== undefined && regData.length !== 0 ?
                <>
                  {regData.map((item)=>(
                        <div className="col-md-6" style={{marginLeft:'0%',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',marginBottom:'4rem',borderRadius:'10px'}}>
                        
                        <div className="">
                          <div style={{height:'100px',marginLeft:'20%',marginTop:'5%'}}>
                            <embed
                              src={`data:application/pdf;base64,${item.certificate.data}`}
                              height={80}
                              width={80}
                            />
                          </div>
                        </div>
                        <div className='row d-flex'>
                          <div className="mt-4 w-50">
                            <p id="enter" style={{fontSize:'15px',fontWeight:'bold',color:'#144272'}}>{t("added")}</p>
                            <p id="enter" style={{fontSize:'15px',fontWeight:'bold',color:'#144272'}}>{item.createdAt.split('T')[0]}</p> 
                          </div>
                          <div className="mt-4 w-50">
                            <p id="enter" style={{fontSize:'15px',fontWeight:'bold',color:'#144272'}}>{item?.certificatedata?.name}</p>
                            <p id="enter" style={{fontSize:'15px',fontWeight:'bold',color:'#144272'}}>{item?.certificatedata?.number}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 mt-4 text-center">
                          <a href onClick={() => ViewActionReg(item)} style={{width:'150px',cursor:'pointer',display:'flex',marginLeft:'36%',marginBottom:'1rem'}}>
                            <BsFillEyeFill style={{fontSize:'25px',color:'#154272',marginLeft:'30px'}}/>
                            <a style={{marginLeft:'2%'}} href id="enterSemi">{t("view")}</a>
                          </a>
                        </div>
                      </div>
                  ))}
                </>
              :
                <div style={{marginTop:'5rem'}}>
                          <center>
                            <label style={{color:'#154272',fontSize:'25px',fontWeight:'bold'}}>{t("record")}</label>
                          </center>
                </div>
              }
          </div>
        }
      </div>
    </div>
  )
}

export default MyDocument
