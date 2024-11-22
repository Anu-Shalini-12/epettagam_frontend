import React, {useState,} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import "../../style/components/_registration.scss"
import { BASE_URL } from "../../components/utilities/config"; 
import axios from "axios";
import Swal from 'sweetalert2'
import loading from "../../Assets/Loading_2.gif"
import { FaArrowAltCircleLeft } from "react-icons/fa";
import "../../style/components/certificate.css"
import { Document, Page } from "react-pdf";

function DiplomaCertTab(props) {
  const location = useLocation();
  const navigate = useNavigate()
  const [loader,setLoader] = useState(false)
  const [code, setCode] = useState('pdf')
  const [pdfFile,setPdfFile] = useState(location?.state?.data?.certificate?.data)
  const [Id_Data,setidData] = useState(undefined)
  const [consent,setConsent] = useState(false)
  const [notfound,setNotFound] = useState(false)


 const handleCertificateData=()=>{
    if(code === "pdf"){
        setCode('data')
        
        const payload={
            fullName: location?.state?.Edudata?.fullName,
            rollNumber: location?.state?.Edudata?.rollNumber,
            year: location?.state?.Edudata?.year,
            dob: location?.state?.Edudata?.dob,
            reg_number: location?.state?.Edudata?.reg_number,
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
            setidData(res.data.data.Certificate)
        }).catch((err)=>{
          Swal.fire({
            icon: "error",
            title: "",
            text: err.response.data.message,
            confirmButtonText: "OK",
          });
          setNotFound(true)
        })
    }else{
    setCode('pdf')
  }
 }


 const hadleAddToWallet=()=>{
  if(consent === true){
    setLoader(true)
  
      const body={
        certificatedetails:Id_Data,
        rollno: location?.state?.Edudata?.rollNumber,
        certificatename: location?.state?.data?.certificate?.filename,
        course: Id_Data?.name
      }
      axios.post(`${BASE_URL}dme/addtowallet`,body,{
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
    }else{
      Swal.fire({
        icon: "error",
        title: "",
        text: "Please give your consent",
        confirmButtonText: "OK",
      });
    }
  }


  return (
    <div className="p-2 row text-start" id="registration-Page1" style={{overflow:'hidden'}}>
      <div className='row'>
          <center><label style={{fontSize:'20px'}}>Certificate has been fetched Successfully</label></center>
        </div>
        <div className='row'>
            <div className='col-12'>
            {code === "pdf" &&
                <div>

                    <div className='row text-start'>
                    <p><FaArrowAltCircleLeft onClick={()=>navigate(-1)} style={{fontSize:'25px'}}/></p>
                    </div>
                    <div className='row'>
                      <center><label style={{fontSize:'18px',fontWeight:'bold',textDecoration:'underline'}}>Certificate</label></center>
                    </div>
                    <div className='mt-2 row w-100 ' style={{marginTop:'0px'}}>          
                        <center><button onClick={handleCertificateData} id="Proceed_button" >Proceed to secure data in Blockchain</button></center>      
                    </div>

                    <div className='mt-2 row w-100' id="mobileDoc">
                      <center>
                        <Document file={`data:application/pdf;base64,${pdfFile}`}>
                          <Page pageNumber={1} />
                        </Document>
                      </center>
                    </div>
                </div>
            }
            {code === "data" &&
                <div style={{overflow:'hidden'}}>
                  {Id_Data !== undefined ?
                        <div>
                                <div className='row' id="labelCert">
                                  <div className='row text-start'>
                                    <p><FaArrowAltCircleLeft onClick={handleCertificateData} style={{fontSize:'25px'}}/></p>
                                  </div>
                                <center><label >Certificate Data</label></center>
                                <div className='mt-3 row' id="valueArea">
                                <div className='col-md-6'>
                                    <div className="mt-3 row">
                                    <div className='col-6'><p id="variable">Certificate Name:</p></div>
                                    <div className='col-6'><p id="valueData">{Id_Data?.name}</p></div>
                                    </div>
                                    <div className="mt-3 row" >
                                    <div className='col-6'><p id="variable">Roll No:</p></div>
                                    <div className='col-6'><p id="valueData">{Id_Data?.number}</p></div>
                                    </div>
                                    <div className="mt-3 row">
                                    <div className='col-6'><p id="variable">Issued By:</p></div>
                                    <div className='col-6'><p id="valueData">{Id_Data?.IssuedBy?.Organization?.name}</p></div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="mt-3 row">
                                    <div className='col-6'><p id="variable">Name:</p></div>
                                    <div className='col-6'><p id="valueData">{Id_Data?.IssuedTo?.Person?.name}</p></div>
                                    </div>
                                    <div className="mt-3 row">
                                    <div className='col-6'><p id="variable">Gender:</p></div>
                                    <div className='col-6'><p id="valueData">{Id_Data?.IssuedTo?.Person?.gender}</p></div>
                                    </div>
                                    <div className="mt-3 row">
                                    <div className='col-6'><p id="variable">Certificate Number:</p></div>
                                    <div className='col-6'><p id="valueData">{Id_Data?.number}</p></div>
                                    </div>
                                    <div className="mt-3 row">
                                    <div className='col-6'><p id="variable">School Name:</p></div>
                                    <div className='col-6'><p id="valueData">{Id_Data?.CertificateData?.School?.name}</p></div>
                                    </div>
                                </div>
                                </div>
                                </div> 
                                <div>
                                </div>

                                <div className='row w-100' style={{marginTop:'30px'}}>
                                  <center>
                                    <p className='font-bold'><input type="checkbox"  onClick={()=>setConsent(!consent)}/> &nbsp; I confirm that I'm permitting my Certificate to upload in the Wallet</p>
                                  </center>
                                    <center>
                                  {loader === false ?
                                    <button onClick={hadleAddToWallet} id="SecureDataButton" style={{background:'#154272',padding:'7px 30px',borderRadius:'9px',color:'white'}}>Secure Your Data on Nambikkai Inaiyam</button>
                                  :
                                    <img src={loading} alt="" id="loaderImg" style={{width:'50px'}}/>
                                  }
                                  </center>
                                </div>
                            
                        </div>
                  :
                    <div className='row'>
                      {notfound !== true ?
                      <center>
                        <p>Processing....</p>
                      </center>
                      :
                        <center>
                          <label style={{marginTop:'3rem',fontSize:'20px',fontWeight:'bold'}}>Not Found Data</label>
                        </center>
                      }
                    </div>
                  }                    
                </div>
            }
            </div>
          </div>
    </div>
  )
}

export default DiplomaCertTab
