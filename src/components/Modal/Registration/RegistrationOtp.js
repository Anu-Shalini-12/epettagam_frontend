import React, {useState} from 'react'
import Card from '../../component/UI/Card3'
import ButtonFill from '../../component/UI/ButtonFill'
import { useNavigate, useLocation } from 'react-router-dom'
import loginLog from '../../../Assets/Group 799.svg'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import axios from "axios";
import loaderGif from "../../../Assets/Loading_2.gif"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import {BASE_URL} from "../../utilities/config"

function RegistrationOtp(props) {
  const { t, i18n } = useTranslation();
  let loginOtp = useSelector((store) => store.esevai.login_otp)  
  const location = useLocation()
  const [RollNo, setRollNo] = useState('')
  const [ModalPopUp,setpopUp] = useState(false)
  const [errors, setError] = useState({name: '',rollNo: '',dob: '',regNo:'',year:''})
  const [formData, setFormData] = useState({name:'',rollNo: '',dob:'',regNo:'',year:''})
  const { name, rollNo, dob, regNo,year } = formData
  const [pdfFile,setPdfFile] = useState('') 
  const [loader,setLoader] = useState(false)
  const [walletLoader,setwalletLoader] = useState(false)
  const [screen,setScreen] = useState('pdf')
  const [certificateData,setcertificateData]= useState('')
  const [fileName,setFileName] = useState('')
  const [formConsent,setFormConsent] = useState(false)
  const [formDataValue, setformDataValue] = useState(undefined)
  const [consent,setconsent] = useState(false)
  // const [popScreen, setpopScreen] = useState('pdf')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const now = new Date().getUTCFullYear();    
  const years = Array(now - (now - 20)).fill('').map((v, idx) => now - idx);
  


  const handleChange = (e) => {
    let bool = null
    if (e.target.value === 'true') {
      bool = true
    }
    if (e.target.value === 'false') {
      bool = false
    }
    setFormData((prev) => ({ ...prev, [e.target.id]: bool ?? e.target.value }))
  }

  const handleValidation = () => {
    // const errors = {};
    let formIsValid = true;
    if (formData.name === undefined || formData.name === '') {
      formIsValid = false;
      errors.name = 'This is a required field';
    }
    if (formData.rollNo === undefined || formData.rollNo === '') {
      formIsValid = false;
      errors.rollNo = 'This is a required field';
    }
    if (formData.regNo === undefined || formData.regNo === '') {
      formIsValid = false;
      errors.regNo = 'This is a required field';
    }
    if (formData.year === undefined || formData.year === '') {
      formIsValid = false;
      errors.year = 'This is a required field';
    }
    if (formData.dob === undefined || formData.dob === '') {
      formIsValid = false;
      errors.dob = 'This is a required field';
    }
    
    setError({ errors });
    return formIsValid;
  }

  const handleSubmit=()=>{
    if(handleValidation()){
        if(formConsent === true){

          if(formData.year > 2015){
              setLoader(true) 
              const body={
                fullName: formData.name,
                rollNumber: formData.rollNo,
                year: formData.year,
                dob: formData.dob,
                reg_number: formData.regNo
              }
              axios.post('https://www.epettagam.tn.gov.in/wallet/dme/getcertificate',body,{
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
                },
              }).then((res)=>{ 
                let valueWallet = res.data.data
                setformDataValue(res.data.data)
                const payload={
                  fullName: formData.name,
                  rollNumber: formData.rollNo,
                  year: formData.year,
                  dob: formData.dob,
                  reg_number: formData.regNo,
                  format: "xml"
      
              }
                let url =''
                if(sessionStorage.getItem('buttonFrom') == "Diploma In General Nursing And Midwifery"){
                  url = `${BASE_URL}dme/getdatan`
                }else{
                  url = `${BASE_URL}dme/getdata`
                }
                axios.post(url,payload,{
                    headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
                    },
                }).then((res)=>{
                  setLoader(false)
                  navigate('/OurServices/Register_document_DiplomaCertTab',{state:{data:valueWallet,
                      Edudata:{
                        fullName: formData.name,
                        rollNumber: formData.rollNo,
                        year: formData.year,
                        dob: formData.dob,
                        reg_number: formData.regNo
                      }
                    }})
                }).catch((err)=>{
                  setLoader(false)
                  Swal.fire({
                    icon: "error",
                    title: "",
                    text: "Invalid Parameter",
                    confirmButtonText: "OK",
                  });
                })
                sessionStorage.setItem('dmeFileName',res.data.data.certificate.filename)
                setPdfFile(res.data.data.certificate.data)
              }).catch((err)=>{
                setLoader(false)
                Swal.fire({
                  icon: "error",
                  title: "",
                  text: err.response.data.message,
                  confirmButtonText: "OK",
                });
              })
            }else{
              Swal.fire({
                icon: "warning",
                title: "",
                text: 'Educational certificates are available for students passing from year 2016 onwards. We are working to bring previous years certificates.',
                confirmButtonText: "OK",
                confirmButtonColor: "#154272",
              });
            }
        }else{
          Swal.fire({
            icon: "warning",
            title: "",
            text: "Please give your consent",
            confirmButtonText: "OK",
          });
        }
      }
  }

  const handleRedirectFunc=()=>{
    navigate('/OurServices/eCertificates')
  }
  
  const handleFormConsent=()=>{
    setFormConsent(!formConsent)
  }


  
  return (
    <div className="w-2/4 m-4 p-10 ml-[40px]">
    <ToastContainer />
      <Card>
        <div>
          <div className="flex">
            <img alt='' onClick={handleRedirectFunc} src={loginLog} style={{cursor:'pointer'}}  className="mt-4 w-9 mb-9 "/>
            {sessionStorage.getItem('buttonFrom') == "Diploma In General Nursing And Midwifery" ?
              <p className="mt-4 ml-4" id="enter" style={{color:'#292828D8',fontSize:"20px",fontWeight:'bold'}}>{t("nursing")}</p>
              :

              <p className="mt-4 ml-4" id="enter" style={{color:'#292828D8',fontSize:"20px",fontWeight:'bold'}}>{t("pharmacy")}</p>

            }
          </div>
          <div className="flex flex-col mb-10 ml-20 space-y-8" style={{marginLeft:'6%',marginTop:'-3%'}}>
            <div className='row'>
              <div className="font-bold col-md-6" style={{marginTop:'2rem',marginBottom:'1rem'}} id="enter">
                <label style={{fontWeight:'bold',fontSize:'15px'}}>{t("roll")}</label><br/>
                <input type="number" value={rollNo} id="rollNo" placeholder={t("toastroll")} onChange={handleChange} style={{color:'black',border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',backgroundColor:'#e2e8f0'}}/>
                { errors.rollNo !== '' && errors.errors.rollNo === "This is a required field" &&
                    <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
              </div>
              <div className="font-bold col-md-6" style={{marginTop:'2rem',marginBottom:'1rem'}} id="enter" >
                <label style={{fontWeight:'bold',fontSize:'15px'}}>{t("reg")}</label><br/>
                <input type="text" value={regNo} id="regNo" placeholder={t("reg")} onChange={handleChange} style={{color:'black',border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',backgroundColor:'#e2e8f0'}}/>
                { errors.regNo !== '' && errors.errors.regNo === "This is a required field" &&
                    <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
              </div> 
              <div className="font-bold col-md-6" id="enter" style={{marginBottom:'1rem'}}>
                <label style={{fontWeight:'bold',fontSize:'15px'}}>{t("name")}</label><br/>
                <input type="text" value={name} id="name" placeholder={t("toastname")} onChange={handleChange} style={{color:'black',border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',backgroundColor:'#e2e8f0'}}/>
                { errors.name !== '' && errors.errors.name === "This is a required field" &&
                    <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
              </div> 
              <div className="font-bold col-md-6" id="enter" >
                <label style={{fontWeight:'bold',fontSize:'15px'}}>{t("Enter_your_DOB")}</label><br/>
                <input type="date" value={dob} id="dob" onChange={handleChange} style={{color:'black',border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',backgroundColor:'#e2e8f0'}}/>
                { errors.dob !== '' && errors.errors.dob === "This is a required field" &&
                    <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
              </div>   
              <div className="font-bold col-md-6" id="enter" >
                <label style={{fontWeight:'bold',fontSize:'15px'}}>{t("Enter_year")}</label><br/>
                <input type="text" value={year} id="year" placeholder={t("toastyear")} onChange={handleChange} style={{color:'black',border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',backgroundColor:'#e2e8f0'}}/>
                
                      { errors.year !== '' && errors.errors.year === "This is a required field" &&
                    <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
              </div> 
            </div>
              <span style={{display:'flex',width:'99%',marginBottom:'0rem'}}><input type="checkbox" onClick={()=>handleFormConsent()}/><p className="ml-2 font-bold" style={{fontSize:'15px'}}>{t("Agreed")}</p></span>  
          <div className="flex mr-10 ">
            
            {loader === false ?
              <ButtonFill onClick={handleSubmit}>{t("submit")}</ButtonFill>
            :
              <center>
                <img src={loaderGif} style={{width:'50px'}} alt=''/>
              </center>
            }
        </div>
        
      </div>
        </div>
      </Card>    

    </div>
  )
}

export default RegistrationOtp
