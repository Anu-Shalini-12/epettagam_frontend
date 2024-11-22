import Card from '../component/UI/Card4'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logoSevai from '../../Assets/TNeGA_logo.png'
import { getCertificates,GetAllServices } from '../store/esevai/action'
import EsevaiCert from '../Modal/EsevaiCert'
import {useLocation } from 'react-router-dom'
import { AiFillCaretDown } from "react-icons/ai";
import Swal from "sweetalert2";
import loading from "../../Assets/Loading_2.gif"
import DropDownComponent from '../Modal/DropDownComponent'
import { useTranslation } from "react-i18next";

function AddDoument() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()
  const [selectedData,setSelected] = useState()
  const store = useSelector((store) => store)
  const loginData = useSelector((store) => store.esevai.login_resp)
  const services = useSelector((store) => store.esevai.serviceList)
  let getCert = useSelector((store) => store.esevai.get_certificate)
  const token = useSelector((store) => store.certificate.otp_verification)
  const [call,setCall]=useState(false)
  const dispatch = useDispatch()
  const [fetchCert,setfetchcert] = useState(true)
  const [selectData, setSelect] = useState([])
  const [open, setOpen] = useState(false)
  const [drop,setdropdown] = useState(false)
  const [currentData,setCurrentData] = useState(null)
  const [getData,setGetdata] = useState(true)
  const [firstData,setFirstData] = useState(false)
  const [loader,setLoader] = useState(false)
  const location = useLocation()
 

 
  useEffect(() => {
    if(getCert.length !== 0){  
      if(firstData === true){
        setLoader(false)
        navigate("/OurServices/Register_document_EsevaiCertTab",{state:{
          certificate:getCert,
          fetchCert:fetchCert,
          selectData:selectData,
          services:services}})
        // setOpen(true)
        setCall(false)
        setfetchcert(false)
      }
    }
  }, [call, getCert])

  if(getData === true){
      dispatch(GetAllServices(sessionStorage.getItem('auth_esevai_id')))
      if (services) {
        setSelected(services[0])
      }
    if(getCert[0]?.message === "data fetched") { 
    }
    setGetdata(false)
  }

  const handleSubmit = (data) => {
    setCall(true)
    setfetchcert(true)
    const body = {
      id: sessionStorage.getItem('esevai_id'),
      aadharid: sessionStorage.getItem('esevai_adhar'),
      servicecode: [data],
    }
    dispatch(getCertificates(body))
  }

  const handleSubmitZButton = () => {
    
    if(selectData.length !== 0){
      setLoader(true)
      const body = {
        id: sessionStorage.getItem('esevai_id'),
        aadharid: sessionStorage.getItem('esevai_adhar'),
        servicecode: [selectData],
      }
      dispatch(getCertificates(body))
      setFirstData(true)
    }else{
      Swal.fire({
        icon: "warning",
        title: "",
        text: "Please select atleast one certificate",
        confirmButtonText: "OK",
        confirmButtonColor: "#154272",
      });
    }
  }
  

  

  const handleUpdate=()=>{
    setOpen(!open)
  }

  const handleDropdown=()=>{
    setdropdown(!drop)
  }


  const FunctService=(data,data1)=>{
    if(data1 === "All"){
      setSelect(data)
      setCurrentData(data1)
      
    }else{
      if(data1 === "Rest1"){
        setSelect([])
        setCurrentData(data1)
      }else{
        setCurrentData(data1)
        selectData.push(data)
      }
    }
  }

  return (
    <div className="flex justify-center" style={{width:'100%'}} >
      <Card>
        <div className="flex flex-col justify-center space-y-4" id="cardUnder">
          <div className="flex items-center ml-5 space-x-2">
            <img alt='' src={logoSevai} style={{ width: '50px', height: '50px' }} />
            <p className="font-bold" id="enter">{t("govt")}</p>
          </div>
          <div className="flex">
            <p className="ml-6 text-sm font-semibold" id="enter">
              {t("selct")}
            </p>
          </div>
        {services.length !== 0 &&
          <div style={{width:'300px',border:'1px solid lightgrey',padding:'10px',borderRadius:'5px',display:'flex'}} onClick={handleDropdown}>
              <a href> {t("service1")}</a>
              <a  href className='justify-end' style={{marginLeft:'72%',marginTop:'5px'}}><AiFillCaretDown/></a>
          </div>
        } 
          {drop === true &&
          <DropDownComponent services={services} FunctService={FunctService} selectData={selectData} currentData={currentData}/>
           
          }
          <div className="flex justify-end mr-5">
            {loader === false ?
              <button style={{backgroundColor:'#144272',color:'white',fontWeight:'bold',padding:'5px 10px',borderRadius:'7px'}} onClick={handleSubmitZButton}>{t("submit")}</button>
            :
              <img src={loading} alt="" style={{width:'45px',height:'45px'}}/>
            }
          </div>
        </div>
      </Card>

    </div>
  )
}

export default AddDoument
