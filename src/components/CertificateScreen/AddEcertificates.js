import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import logoDoc from '../../Assets/Mask_Group_1.png'
import 'react-responsive-modal/styles.css'
import loader from '../../Assets/Loading_2.gif'
import 'react-toastify/dist/ReactToastify.css';
import {toast,ToastContainer} from 'react-toastify';
import { getSevCert } from '../store/certificates/action'
import Swal from 'sweetalert2'
import { BASE_URL } from "../utilities/config"; 
import { useTranslation } from "react-i18next";
import axios from "axios";


function AddEcertificates() { 
  const { t } = useTranslation();
  const [certDetails,setcertDetails] = useState(undefined)
  let certDetails_err = useSelector((store) => store.certificate.certDetail_err)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let [redirectScreen,setredirectScreen] = useState(false)
  const [SubLoader,setLoader] = useState(true)
  const [dept,setDept] = useState(location.state?.id)
  const [errors, setError] = useState({name: '',rollNo: '',yop: '',dob: '',flag: '',certType: '',month: ''})
  const [formData, setFormData] = useState({name: sessionStorage.getItem('username'),rollNo: '',yop: '',dob:sessionStorage.getItem('dob'),flag: '',certType: 'REGULAR',month: ''})
  const [dataRec, setDataRec] =useState('')
  const [consent, setconsent] = useState('')
  const { name, rollNo, yop, certType, month } = formData
  const [startDate, setStartDate] = useState(sessionStorage.getItem('dob'));
  const [setDate] = useState(undefined)
  const [firstData,setFirstData] = useState(false)
  const [callData,setCallData] = useState(false)
  const [open, setOpen] = useState(false)
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  const now = new Date().getUTCFullYear();    

  useEffect(()=>{
      if(redirectScreen === true){
        const splitDate= startDate.split('-')
        const startDate1 = splitDate[0]+'-'+splitDate[1]+'-'+splitDate[2] 
        let flag = ''
        if(location.state.id === 'ssc'){
          flag = "X"
        }
        if(location.state.id === 'hscxi'){
          flag = "XI"
        }
        if(location.state.id === 'hsc'){
          flag = "XII"
        }
        navigate('/OurServices/Register_document_EduCertTab',{state:{data:certDetails,
        Edudata:{
          fullname : formData.name,
          rollno : formData.rollNo,
          year : formData.yop,
          dob : startDate1,
          certificatetype : formData.certType,
          flag: flag,
          month : formData.month,
          format: "pdf"
        }
        }})
      }
  },[callData, certDetails, formData.certType, formData.month, formData.name, formData.rollNo, formData.yop, location.state.id, navigate, redirectScreen, startDate])


  const handleConsent=()=>{
    if(consent == true){
      setconsent(false)
    }else{
      setconsent(true)
    }

  }


  useEffect(() => {
    setLoader(false)    
    dispatch(getSevCert(sessionStorage.user,))
  }, [certDetails, dispatch])

  useEffect(() => {
    if(firstData === true){
      setLoader(false)
      toast.error(certDetails_err.response?.data?.message)
    }
  }, [certDetails_err])


  useEffect(() => {}, [dept])
 
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
    let formIsValid = true;
    if (formData.name === undefined || formData.name === '') {
      formIsValid = false;
      errors.name = 'This is a required field';
    }
    if (formData.rollNo === undefined || formData.rollNo === '') {
      formIsValid = false;
      errors.rollNo = 'This is a required field';
    }
    if (formData.yop === undefined || formData.yop === '') {
      formIsValid = false;
      errors.yop = 'This is a required field';
    }
    if (startDate === undefined || startDate === '') {
      formIsValid = false;
    }

    if (formData.certType === undefined || formData.certType === '') {
      formIsValid = false;
      errors.certType = 'This is a required field';
    }
    

    if (formData.month === undefined || formData.month === '') {
      formIsValid = false;
      errors.month = 'This is a required field';
    }
    
    setError({ errors });
    return formIsValid;
  }


  const handleSubmit = () => {
    if(consent == true){
      if(handleValidation() === true){
        if(formData.yop > 2015){
          setLoader(true)
          const splitDate= startDate.split('-')
          const startDate1 = splitDate[2]+'-'+splitDate[1]+'-'+splitDate[0] 
          setStartDate(startDate1)
          if(location.state.id === 'hsc'){
            const body = {
              fullname : formData.name,
              rollno : formData.rollNo,
              year : formData.yop,
              dob : startDate1,
              certificatetype : formData.certType,
              flag : "XII", 
              month : formData.month,
              format: "pdf"
            }
            setDataRec(body)
            ApiCallFunction("hsc",body)
            setFirstData(true)
          }  
          if(location.state.id === 'hscxi'){
            const body = {
              fullname : formData.name,
              rollno : formData.rollNo,
              year : formData.yop,
              dob : startDate1,
              certificatetype : formData.certType,
              flag : "XI", 
              month : formData.month,
              format: "pdf"
            }
            setDataRec(body)
            ApiCallFunction("hscxi",body)
            setFirstData(true)
          }

          if(location.state.id === 'ssc'){
            const body = {
              fullname : formData.name,
              rollno : formData.rollNo,
              year : formData.yop,
              dob : startDate1,
              certificatetype : formData.certType,
              flag : "X", 
              month : formData.month, 
              format: "pdf"
            }
            setDataRec(body)
            ApiCallFunction("ssc",body)
            setFirstData(true)
          }
          
          setOpen(true)
        }else{
          Swal.fire({
            icon: "warning",
            title: "",
            text: 'Educational certificates are available for students passing from year 2016 onwards. We are working to bring previous years certificates.',
            confirmButtonText: "OK",
            confirmButtonColor: "#154272",
          });
        }
      }
    }else{
      Swal.fire({
        icon: "warning",
        title: (t("givCons")),
        text: '',
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      });
      
    }
  }

  const ApiCallFunction=(dept,body)=>{
    axios
    .post(BASE_URL + `edu/` + dept + `/getcerts`, body, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    })
    .then((res) => {
      setcertDetails(res.data.data)
      setredirectScreen(true)
      
    })
    .catch((err) => {
      setLoader(false)
      Swal.fire({
        icon: "error",
        title: "",
        text: err.response.data.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#03596e",
      })
    });
  }

  const handleChangename=(e)=>{  
    let value = e.target.value  
    setFormData((prev) => ({ ...prev, name:  value }))
  }

  const handleChangeyear=(e)=>{  
    let value = e.target.value   
    setFormData((prev) => ({ ...prev, yop:  value }))
  }
  const handleChangeDate=(e)=>{
    setStartDate(e.target.value)
  }

  useEffect(() => {
  }, [dept])
  return (
    <div style={{ width: '100%' }}>
      <ToastContainer/>
      {location.state ? (
        <>
          {' '}
          <div 
            id="boxShod"
            className="mt-10"
            style={{
              width: '87%',
              marginBottom: '10%',
            }}
          >
            <div className="flex ml-6" style={{paddingTop:'20px'}}>
              <img alt='' src={logoDoc} />
              <p className="mt-3 font-bold" id="enter" style={{fontSize: '20px'}}>
              {t("stateBoard1")} {location.state.id === 'hsc' && <>XII</>}{location.state.id === 'hscxi' && <>XI</>}{location.state.id === 'ssc' && <>X</>} 
              </p>
            </div>
            <div className="mt-1 ml-16" >
              <div className="grid grid-cols-2 " id="formField">
                <div>
                  <label className="mt-4 mb-1 font-bold" id="enter">{t("roll")}</label>
                  <br/>
                  <input
                    className="w-3/4 p-2 mt-2 rounded-lg bg-slate-200"
                    style={{border:'none',fontSize:'15px',outline:'none'}}
                    id="rollNo"
                    type="text"
                    name="rollNo"
                    placeholder={t("toastroll")}
                    value={rollNo}
                    onChange={handleChange}
                  />
                  <br/>
                  { errors.rollNo !== '' && errors.errors.rollNo === "This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
                </div>
                <div>
                  <label className="mt-4 mb-1 font-bold" id="enter">{t("name")}</label>
                  <br/>
                <input
                  className="w-3/4 p-2 mt-2 border rounded-lg bg-slate-200"
                  style={{border:'none',fontSize:'15px',outline:'none'}}
                  type="text"
                  id="name"
                  value={name}
                  placeholder={t("name")}
                  onChange={handleChangename}
                />
                {errors.name !== '' && errors.errors.name === "This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
                </div>
              </div>
            </div>
            <div className="mt-2 ml-16">
              <div className="grid grid-cols-2 " id="formField">
                <div>
                  <label className="mt-4 mb-1 font-bold" id="enter">{t("year")}</label><br/>
                  <input
                  className="w-3/4 p-2 mt-2 border rounded-lg bg-slate-200"
                  style={{border:'none',fontSize:'15px',outline:'none'}}
                  type="text"
                  id="yop"
                  value={yop}
                  placeholder={t("year")}
                  onChange={handleChangeyear}
                />
                  {errors.yop !== '' && errors.errors.yop === "This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
                </div>
                <div>
                  <label className="mt-4 mb-1 font-bold" id="enter">{t("Certificate_Type")}</label>
                  <br/>
                  <input
                  className="w-3/4 p-2 mt-2 border rounded-lg bg-slate-200"
                  disabled style={{border:'none',fontSize:'15px',outline:'none'}}
                  type="text"
                  id="certType"
                  value={certType}
                  placeholder={t("Certificate_Type")}
                  onChange={handleChange}
                />
                </div>
              </div>
            </div>
            <div className="mt-2 mb-10 ml-16">
              <div className="grid grid-cols-2" id="formField">
                <div>
                  <label className="mt-4 mb-1 font-bold" id="enter">{t("date")}</label>
                  <br/>
                  <input id="Dobinput"
                  className="p-2 mt-2 border rounded-lg bg-slate-200"
                   style={{border:'none',fontSize:'15px',outline:'none',height:'36px'}}
                  type="date"
                  value={startDate}
                  placeholder={t("date")}
                  onChange={handleChangeDate}
                />
                {errors.dob !== '' && errors.errors.dob === "This is a required field" &&
                <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
                </div>
                <div>
                  <label className="mt-4 mb-1 font-bold" id="enter">{t("month")}</label>
                  <br/>
                    <select
                    type="text"
                    id="month"
                    style={{border:'none',fontSize:'15px',outline:'none'}}
                    className="w-3/4 p-2 mt-2 border rounded-lg bg-slate-200"
                    value={month}
                            onChange={handleChange}
                          >
                            <option>Select</option>
                            
                            {months.length !== 0 &&
                              months.map((id) => (
                                <option id style={{ color: 'black' }}>
                                  {' '}
                                  {id}
                                </option>
                              ))
                            }
                    </select>
                  {errors.month !== '' && errors.errors.month ==="This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>{t("requiredField")}</p>}
                </div>
              </div>
            </div>
            <div className="mt-2 mb-10 ml-16">
            <p style={{color:'red',fontSize:'12px'}}>{errors?.errors?.consent}</p>
              <span style={{display:'flex',width:'99%',marginBottom:'2rem'}}><input style={{width:'15px'}} type="checkbox" onClick={()=>handleConsent()}/><p className="ml-2 font-bold" style={{fontSize:'15px'}}>{t("Agreed")} </p></span>
              
              <a href className="cancelbutton" id="submitButton"
                onClick={()=>navigate('/OurServices')}
                >
                  {t("cancel")}
                </a>
              {SubLoader === true ?
                <img alt='' src={loader} style={{width:'50px',marginLeft:'85%',marginTop:'-2rem'}} />
              :
                <a href id="submitButton"
                style={{marginLeft:'1%'}}
                  onClick={handleSubmit} 
                  className=""
                >
                  {t("submit")}
                </a>
              }
            </div>
          </div>
        </>
      ) : (
        <div>404</div>
      )}
    </div>
  )
}

export default AddEcertificates
