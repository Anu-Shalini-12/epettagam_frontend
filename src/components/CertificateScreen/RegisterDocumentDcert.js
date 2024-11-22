import React, {useState,} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import verified from "../../Assets/verified.png"
import "../../style/components/_registration.scss"
import { BASE_URL } from "../../components/utilities/config"; 
import axios from "axios";
import Swal from 'sweetalert2'
import loading from "../../Assets/Loading_2.gif"
import { Document, Page } from "react-pdf";
import { FaArrowAltCircleLeft } from "react-icons/fa";


function RegisterDocumentDcert(props) {
  const location = useLocation();
  const navigate = useNavigate()
  const [loader,setLoader] = useState(false) 
  const [code, setCode] = useState('pdf')
  const [pdfFile,setPdfFile] = useState(location?.state?.data?.certificate?.data)
  const [certificateData,setcertificateData]= useState(undefined)
  const [fileName,setFileName] = useState(location?.state?.data?.certificate?.filename)

  
 const handleCertificateData=()=>{
  if(code === "pdf"){
    setCode('data')
    const body={
      seqNo: location?.state?.seqNo,
      regYear:location?.state?.regYear,
      level1: location?.state?.level1,
      level2: location?.state?.level2,
      level3: location?.state?.level3,
      fullName: location?.state?.fullName,
      dob: location?.state?.dob,
      gender: location?.state?.gender
    }
    axios.post(`${BASE_URL}rg/dtctdt`,body,{
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
  }
  else{
    setCode('pdf')
  }
 }


 const hadleAddToWallet=()=>{
  setLoader(true)
    const body={
      seqNo: location?.state?.seqNo,
      regYear:location?.state?.regYear,
      level1: location?.state?.level1,
      level2: location?.state?.level2,
      level3: location?.state?.level3,
      fullName: location?.state?.fullName,
      dob: location?.state?.dob,
      gender: location?.state?.gender
    }
    axios.post(`${BASE_URL}rg/dtctdt`,body,{
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
      axios.post(`${BASE_URL}rg/dt/add`,body,{
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
          <p>Transaction ID : <span>{certificateData?.txid}</span></p>
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

export default RegisterDocumentDcert
