import React, {useState,useEffect} from 'react'
import Card from '../component/UI/Card3'
import ButtonFill from '../component/UI/ButtonFill'
import { useNavigate, useLocation } from 'react-router-dom'
import loginLog from '../../Assets/Group 799.svg'
import { useSelector, useDispatch } from 'react-redux'
import OtpInput from 'react-otp-input';
import Swal from 'sweetalert2'
import { AiOutlineCloseCircle } from "react-icons/ai";
import pdfFile from "../../Assets/dummy.pdf"
import axios from "axios";
import loaderGif from "../../Assets/Loading_2.gif"
import { BiLeftArrow ,BiRightArrow} from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { BsQuestionCircle } from "react-icons/bs";
import logo from "../../Assets/Nambikkai iniyam logo1.png"
import { BASE_URL } from "../../components/utilities/config"; 
import {postZoneApi,postDistrictApi,postSroApi} from "../store/certificates/action"

function RegistrationBCertScreen(props) {
  const { t, i18n } = useTranslation();
  let zoneList = useSelector((store) => store.certificate.allZone) 
  let districtList = useSelector((store) => store.certificate.allDistrict) 
  let sroList = useSelector((store) => store.certificate.allSro) 
  const location = useLocation()
  const [ModalPopUp,setpopUp] = useState(false)
  const [errors, setError] = useState({name: '',seqNo: '',dob: '',regyr:'',gender:'',zone:'',district:'',sro:''})
  const [seqNo,setSeqNo] = useState(undefined) 
  const [regyr,setRegyr] = useState(undefined)
  const [name,setName] = useState(undefined)
  const [dob,setDob] = useState(undefined)
  const [gender,setGender] = useState(undefined)
  const [pdfFile,setPdfFile] = useState('') 
  const [loader,setLoader] = useState(false)  
  const [walletLoader,setwalletLoader] = useState(false)
  const [screen,setScreen] = useState('pdf')
  const [certificateData,setcertificateData]= useState('')
  const [fileName,setFileName] = useState('')
  const [formConsent,setFormConsent] = useState(false)
  const [consent,setconsent] = useState(false)
  const [zone,setZone] = useState(undefined)
  const [district,setDistrict] = useState(undefined)
  const [sro,setSro] = useState(undefined)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  


  useEffect(()=>{
    dispatch(postZoneApi());
  },[dispatch])
  

  const handleValidation = () => {
    let formIsValid = true;
    if (name === undefined || name === '') {
      formIsValid = false;
      errors.name = 'This is a required field';
    }
    if (seqNo === undefined || seqNo === '') {
      formIsValid = false;
      errors.seqNo = 'This is a required field';
    }
    if (zone === undefined || zone === '') {
      formIsValid = false;
      errors.zone = 'This is a required field';
    }
    if (district === undefined || district === '') {
      formIsValid = false;
      errors.district = 'This is a required field';
    }
    if (sro === undefined || sro === '') {
      formIsValid = false;
      errors.sro = 'This is a required field';
    }
    if (regyr === undefined || regyr === '') {
      formIsValid = false;
      errors.regyr = 'This is a required field';
    }
    if (gender === undefined || gender === '') {
      formIsValid = false;
      errors.gender = 'This is a required field';
    }
    if (dob === undefined || dob === '') {
      formIsValid = false;
      errors.dob = 'This is a required field';
    }
    
    setError({ errors });
    return formIsValid;
  }

  const handleSubmit=()=>{
    if(handleValidation()){
        if(formConsent === true){

              setLoader(true) 
              const body={
                seqNo: seqNo,
                regYear: regyr,
                level1: zone,
                level2: district,
                level3: sro,
                fullName: name,
                dob: dob,
                gender: gender
              }
              axios.post(`${BASE_URL}rg/brctpdf`,body,{
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
                },
              }).then((res)=>{
                setLoader(false)
                navigate('/OurServices/Register_document_BCert', { state: { data: res.data.data,
                  seqNo: seqNo,
                  regYear: regyr,
                  level1: zone,
                  level2: district,
                  level3: sro,
                  fullName: name,
                  dob: dob,
                  gender: gender
                 } })               
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
            text: "Please give your consent",
            confirmButtonText: "OK",
          });
        }
      }
  }


  const handleRedirectFunc=()=>{
    navigate('/OurServices/Registration')
  }

  
  const handleFormConsent=()=>{
    setFormConsent(!formConsent)
  }


  const handleSelectZone=(e)=>{
    setZone(e.target.value)
    for(var i=0;i<zoneList.data.length;i++){
      if(e.target.value === zoneList.data[i].zone_code){
        dispatch(postDistrictApi(zoneList.data[i].zone))
      }
    }
  }

  const handleSelectDistrict=(e)=>{
    setDistrict(e.target.value)
    for(var i=0;i<districtList.data.length;i++){
      if(e.target.value === districtList.data[i].district_code){
        dispatch(postSroApi(districtList.data[i].district))
      }
    }
  }

  const handleSelectSro=(e)=>{
    setSro(e.target.value)
  }


  return (
    <div className="w-2/4 m-4 p-10 ml-[40px]">
    <ToastContainer />
      <Card>
        <div style={{marginTop:'-40px'}}>
          <div className="flex">
            <img alt='' onClick={handleRedirectFunc} src={loginLog} style={{cursor:'pointer'}}  className="mt-4 w-9 mb-9 "/>
            {sessionStorage.getItem('buttonFrom') === "Marriage certificate" &&
              <p className="mt-4 ml-4" id="enter" style={{color:'#292828D8',fontSize:"20px",fontWeight:'bold'}}>{t("MCert")}</p>
            }
            {sessionStorage.getItem('buttonFrom') === "Death Certificate" &&
              <p className="mt-4 ml-4" id="enter" style={{color:'#292828D8',fontSize:"20px",fontWeight:'bold'}}>{t("DCERT")}</p>
            }
            {sessionStorage.getItem('buttonFrom') === "Birth Certificate" &&
              <p className="mt-4 ml-4" id="enter" style={{color:'#292828D8',fontSize:"20px",fontWeight:'bold'}}>{t("BCert")}</p>
            }
          </div>
          <div className="flex mb-10 ml-20 space-y-8 row" style={{marginLeft:'6%'}}>
            <div className="font-bold col-md-6" id="enter" >
              <label style={{fontWeight:'500',fontSize:'15px'}}>{t("seqNum")}</label><br/>
              <input type="text" value={seqNo} id="seqNo" placeholder="Seq No" onChange={(e)=>setSeqNo(e.target.value)} style={{border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',color:'grey',background:'#f7fafc'}}/>
              { errors.seqNo !== '' && errors.errors.seqNo === "This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
            </div>
            <div className="font-bold col-md-6 " id="enter" >
              <label style={{fontWeight:'500',fontSize:'15px'}}>{t("regYr")}</label><br/>
              <input type="number" value={regyr} id="regyr" placeholder="Reg No" onChange={(e)=>setRegyr(e.target.value)} style={{border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',color:'grey',background:'#f7fafc'}}/>
              { errors.regyr !== '' && errors.errors.regyr === "This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
            </div> 
              <div className="font-bold col-md-6" id="enter">
                <label style={{fontWeight:'500',fontSize:'15px'}}>{t("Zone")}</label><br/>
                <select onChange={handleSelectZone} value={zone} style={{border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',outline:'none',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',color:'grey',background:'#f7fafc'}}>
                  <option>Select Zone</option>
                  {zoneList !== undefined && zoneList !== "" && zoneList.data.map((item)=>(
                    <option value={item.zone_code} >{item.zone}({item.zone_code})</option>
                  ))}
                </select>
                { errors.zone !== '' && errors.errors.zone === "This is a required field" &&
                    <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
              </div> 
              <div className="font-bold col-md-6" id="enter">
                <label style={{fontWeight:'500',fontSize:'15px'}}>{t("District1")}</label><br/>
                <select onChange={handleSelectDistrict} value={district} style={{border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',outline:'none',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',color:'grey',background:'#f7fafc'}}>
                  <option>Select District</option>
                  {districtList !== undefined && districtList !== "" && districtList.data.map((item)=>(
                    <option value={item.district_code} >{item.district}({item.district_code})</option>
                  ))}
                </select>
                { errors.district !== '' && errors.errors.district === "This is a required field" &&
                    <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
              </div>  
              <div className="font-bold col-md-6" id="enter">
                <label style={{fontWeight:'500',fontSize:'15px'}}>{t("Sro")}</label><br/>
                <select onChange={handleSelectSro} value={sro} style={{border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',outline:'none',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',color:'grey',background:'#f7fafc'}}>
                  <option>Select Sro</option>
                  {sroList !== undefined && sroList !== "" && sroList.data.map((item)=>(
                    <option value={item.sro_code} >{item.sro}({item.sro_code})</option>
                  ))}
                </select>
                { errors.sro !== '' && errors.errors.sro === "This is a required field" &&
                    <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
              </div> 
            <div className="font-bold col-md-6 " id="enter">
              <label style={{fontWeight:'500',fontSize:'15px'}}>{t("name")}</label><br/>
              <input type="text" value={name} id="name" placeholder="Ex: Name" onChange={(e)=>setName(e.target.value)} style={{border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',color:'grey',background:'#f7fafc'}}/>
              { errors.name !== '' && errors.errors.name === "This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
            </div> 
            <div className="font-bold col-md-6 " id="enter">
              <label style={{fontWeight:'500',fontSize:'15px'}}>{t("Enter_your_DOB")}</label><br/>
              <input type="date" value={dob} id="dob" onChange={(e)=>setDob(e.target.value)} style={{border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',color:'grey',background:'#f7fafc'}}/>
              { errors.dob !== '' && errors.errors.dob === "This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
            </div>   
            <div className="font-bold col-md-6 " id="enter">
              <label style={{fontWeight:'500',fontSize:'15px'}}>{t("Gender")}</label><br/>
              <input type="text" value={gender} id="gender" placeholder="EX: Male" onChange={(e)=>setGender(e.target.value)} style={{border:'1px solid lightgrey',marginTop:'0.5rem',width:'80%',height:'40px',borderRadius:'7px',padding:'10px',fontSize:'15px',fontWeight:'500',color:'grey',background:'#f7fafc'}}/>
                    { errors.gender !== '' && errors.errors.gender === "This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
            </div> 
              <span style={{display:'flex',width:'99%',marginBottom:'2rem'}}><input type="checkbox" onClick={()=>handleFormConsent()}/><p className="ml-2" style={{fontSize:'14px',fontWeight:'500'}}>{t("Agreed")}</p></span>  
          <div className="flex justify-end mr-10 " style={{marginTop:'-6%'}}>
            
            {loader === false ?
              <ButtonFill 
              onClick={handleSubmit}
              >{t("submit")}</ButtonFill>
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

export default RegistrationBCertScreen
