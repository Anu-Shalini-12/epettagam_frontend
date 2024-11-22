import React, {useState,useEffect} from 'react'
import Card from '../component/UI/Card3'
import ButtonFill from '../component/UI/ButtonFill'
import { useNavigate, useLocation } from 'react-router-dom'
import loginLog from '../../Assets/Group 799.svg'
import { useSelector, useDispatch } from 'react-redux'
import verified from "../../Assets/verified.png"
import "../../style/components/_registration.scss"
import { AiFillCaretLeft,AiFillCaretRight } from "react-icons/ai";
import { BASE_URL } from "../../components/utilities/config"; 
import axios from "axios";
import Swal from 'sweetalert2'
import loading from "../../Assets/Loading_2.gif"
import { Document, Page } from "react-pdf";
import { FaArrowAltCircleLeft } from "react-icons/fa";


function RegisterDocumentMcert(props) {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('pdf')
  const [loader,setLoader] = useState(false)
  const [pdfFile,setPdfFile] = useState(location?.state?.data?.certificate?.data) 
  const [fileName,setFileName] = useState(location?.state?.data?.certificate?.filename)
  const [certificateData,setcertificateData]= useState(undefined)

  
 const handleCertificateData=()=>{
  if(code === "pdf"){
    setCode('data')
    const body={
      seqNo: location?.state?.seqNo,
      regYear: location?.state?.regYear,
      certiType: location?.state?.certiType,
      level1: location?.state?.level1,
      level2: location?.state?.level2,
      level3: location?.state?.level3,
      uid: location?.state?.uid,
      fullName: location?.state?.fullName,
      dob: location?.state?.dob,
      gender: location?.state?.gender
    }
    axios.post(`${BASE_URL}rg/mrctdt`,body,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    }).then((res)=>{
      setcertificateData(res.data.data.Certificate)             
    }).catch((err)=>{
     
      Swal.fire({
        icon: "error",
        title: "",
        text: err.response.data.message,
        confirmButtonText: "OK",
      });
    })
  }else{
    setCode('pdf')
  }
 }


 const hadleAddToWallet=()=>{
  setLoader(true)
    const body={
      seqNo: location?.state?.seqNo,
      regYear: location?.state?.regYear,
      certiType: location?.state?.certiType,
      level1: location?.state?.level1,
      level2: location?.state?.level2,
      level3: location?.state?.level3,
      uid: location?.state?.uid,
      fullName: location?.state?.fullName,
      dob: location?.state?.dob,
      gender: location?.state?.gender
    }
    axios.post(`${BASE_URL}rg/mrctdt`,body,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
      },
    }).then((res)=>{
      const body={
        certificateDetails:res.data.data.Certificate,
        certificateName: fileName,
        seqNo: location?.state?.seqNo,
        regYear: location?.state?.regYear,
        level1: location?.state?.level1,
        level2: location?.state?.level2,
        level3: location?.state?.level3
      }
      axios.post(`${BASE_URL}rg/mr/add`,body,{
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
        });
      }).catch((err)=>{
        setLoader(false)
        Swal.fire({
          icon: "error",
          title: "",
          text: err.response.data.message,
          confirmButtonText: "OK",
        });
      })
      
    }).catch((err)=>{
      setLoader(false)
      Swal.fire({
        icon: "error",
        title: "",
        text: err.response.data.message,
        confirmButtonText: "OK",
      });
    })
    
  }


  return (
    <div className="p-5 text-start w-100" id="registration-Page">
        <label className='d-flex'><img src={verified} alt="" />This Certificates Belong to Sequence No <span> 45892837 </span>is Verified By Nambikkai Inaiyam. </label>
        {certificateData.txid !== undefined &&
          <p>Transaction ID : <span>{certificateData.txid}</span></p>
        }
        <div className='row'>
            
            <div className='col-12'>
            {code === "pdf" &&
                           
              <div className='row w-100'>
                <div className='row text-start'>
                  <p><FaArrowAltCircleLeft onClick={()=>navigate(-1)} style={{fontSize:'25px'}}/></p>
                </div>
                <div className='mt-2 row w-100 ' style={{marginTop:'0px'}}>          
                <center><button onClick={handleCertificateData} id="Proceed_button" >Proceed to secure data in Blockchain</button></center>    
            </div>
              <center>
                <Document file={`data:application/pdf;base64,${pdfFile}`}>
                  <Page pageNumber={1} />
                </Document>
              </center>
            </div>
            }
            {code === "data" &&
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
            <div className='row w-100' style={{marginTop:'30px'}}>
              <center>
                {loader === false ?
                  <button onClick={hadleAddToWallet} id="Proceed_button">Secure Your Data on Nambikkai Inaiyam</button>
                :
                  <img src={loading} alt="" id="loaderImg"  style={{width:'70px'}}/>
                }
              </center>
        </div> 
          </div> 
        }
            </div>
          </div>
        
    </div>
  )
}

export default RegisterDocumentMcert
