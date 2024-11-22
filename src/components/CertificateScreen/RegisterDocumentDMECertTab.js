import React, {useState,useEffect} from 'react'
import Card from '../component/UI/Card3'
import ButtonFill from '../component/UI/ButtonFill'
import { useNavigate, useLocation } from 'react-router-dom'
import loginLog from '../../Assets/Group 799.svg'
import { useSelector, useDispatch } from 'react-redux'
import verified from "../../Assets/verified.png"
import "../../style/components/_registration.scss"
import { AiFillCaretLeft,AiFillCaretRight } from "react-icons/ai";
import Modal from 'react-modal';
import { BASE_URL } from "../../components/utilities/config"; 
import axios from "axios";
import Swal from 'sweetalert2'
import loading from "../../Assets/Loading_2.gif"
import logo from '../../Assets/Mask_Group_1.png'
import { useTranslation } from "react-i18next";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { shareCertificate } from '../store/esevai/action'
import "../../style/components/certificate.css"
import { Document, Page } from "react-pdf";


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
  const [code, setCode] = useState('pdf')
  const [pdfFile,setPdfFile] = useState(location?.state?.data?.certificate?.data)
  const [certificateData,setcertificateData]= useState(location?.state?.data?.certificate)
  const [Id_Data,setidData] = useState(undefined)
  const [consent,setConsent] = useState(false)
  const screenFrom = location?.state?.screen


 const handleCertificateData=()=>{
    if(code === "pdf"){
        setCode('data')
        let value = undefined;
        if(location?.state?.Edudata?.flag == 'X'){
            value = `${BASE_URL}edu/ssc/getcerts`
        }
        if(location?.state?.Edudata?.flag == 'XI'){
            value = `${BASE_URL}edu/hscxi/getcerts`
        }
        if(location?.state?.Edudata?.flag == 'XII'){
            value = `${BASE_URL}edu/hsc/getcerts`
        }
        const payload={
            fullname: location?.state?.Edudata?.fullname,
            rollno: location?.state?.Edudata?.rollno,
            year: location?.state?.Edudata?.year,
            dob: location?.state?.Edudata?.dob,
            certificatetype: location?.state?.Edudata?.certificatetype,
            flag: location?.state?.Edudata?.flag, 
            month: location?.state?.Edudata?.month,
            format: "xml"
        }

        axios.post(value,payload,{
            headers: {
            Authorization: "Bearer " + sessionStorage.getItem("authtoken"),
            },
        }).then((res)=>{
            setidData(res.data.data)
        }).catch((err)=>{

        })
    }else{
    setCode('pdf')
  }
 }


 const hadleAddToWallet=()=>{
  if(consent === true){
    setLoader(true)

        let value = undefined;
        if(location?.state?.Edudata?.flag == 'X'){
            value = `${BASE_URL}edu/ssc/addtowallet`
        }
        if(location?.state?.Edudata?.flag == 'XI'){
            value = `${BASE_URL}edu/hscxi/addtowallet`
        }
        if(location?.state?.Edudata?.flag == 'XII'){
            value = `${BASE_URL}edu/hsc/addtowallet`
        }     
      const body={
        certificatedetails:Id_Data,
        rollno: location?.state?.Edudata?.rollno,
        certificatename: location?.state?.data?.certificate?.filename,
        flag: location?.state?.Edudata?.flag
      }
      axios.post(value,body,{
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
    <div className="p-2 text-start" id="registration-Page1">
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

                    <div className='mt-2 row' id="mobileDoc">
                      <center>
                        <Document file={`data:application/pdf;base64,${pdfFile}`}>
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
                          {certificateData !== undefined ?
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
                                </div>

                                <div className='row w-100 text-end' style={{marginTop:'-30px'}}>
                                  <center>
                                  {loader === false ?
                                    <button onClick={hadleAddToWallet} id="Proceed_button">Secure Your Data on Nambikkai Inaiyam</button>
                                  :
                                    <img src={loading} alt="" id="loaderImg" style={{width:'70px'}}/>
                                  }
                                  </center>
                                </div>
                            
                          </div>
                          :
                            <div className='mt-5 row'>
                              <center>Processing..... </center>
                            </div>
                          }
                        </div>
                    :
                      <div>
                        {Id_Data !== undefined ?
                          <div className="mt-6 mb-6 " id="labelCert">

                                    <div className='row text-start'>
                                      <p><FaArrowAltCircleLeft onClick={handleCertificateData} style={{fontSize:'25px'}}/></p>
                                    </div>
                                  <center><label  style={{marginBottom:'2rem',textDecoration:'underline'}}>Certificate Data</label></center>
                              <div className="grid justify-end grid-cols-2 gap-8" id="certData">
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("Name")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.issuedTo?.person?.name !== undefined && Id_Data.Certificate.issuedTo.person.name}</div>
                              </div>
                              <div className="grid items-end justify-end grid-cols-2">
                                  <div className="font-bold" id="enter">{t("Roll_No")}.</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.issuedTo?.person?.roll !== undefined && Id_Data.Certificate.issuedTo.person.roll}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("dob")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.issuedTo?.person?.dob !== undefined && Id_Data.Certificate.issuedTo.person.dob}</div>
                              </div>
                              <div className="grid items-end justify-end grid-cols-2">
                                  <div id="enter" className="font-bold">{t("Class")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.issuedTo?.person?.class !== undefined && Id_Data.Certificate.issuedTo.person.class}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData" >
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("random")}.</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.issuedTo?.person?.randomNo !== undefined && Id_Data.Certificate.issuedTo.person.randomNo}</div>
                              </div>
                              <div className="grid items-end grid-cols-2">
                                  <div id="enter" className="font-bold">{t("Year_Passing")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.CertificateData?.examination?.year !== undefined && Id_Data.Certificate.CertificateData.examination.year}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("month")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.CertificateData?.examination?.month !== undefined && Id_Data.Certificate.CertificateData.examination.month}</div>
                              </div>
                              <div className="grid items-end grid-cols-2">
                                  <div id="enter" className="font-bold">{t("tmr")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.CertificateData?.info?.tmrCode !== undefined && Id_Data.Certificate.CertificateData.info.tmrCode}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                              <div className="grid grid-cols-2">
                                  <div id="enter" className="font-bold">{t("Session")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.CertificateData?.examination?.session !== undefined && Id_Data.Certificate.CertificateData.examination.session}</div>
                              </div>
                              <div className="grid grid-cols-2">
                                  <div id="enter" className="font-bold">{t("tmrdate")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.CertificateData?.info?.tmrDate !== undefined && Id_Data.Certificate.CertificateData.info.tmrDate}</div>
                              </div>
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                              <div className="grid grid-cols-2">
                                  <div id="enter" className="font-bold">{t("Med")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.CertificateData?.school?.medium !== undefined && Id_Data.Certificate.CertificateData.school.medium}</div>
                              </div> 
                              <div className="grid grid-cols-2">
                                  <div id="enter" className="font-bold">{t("Tmar")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.CertificateData?.performance?.marksTotal !== undefined && Id_Data.Certificate.CertificateData.performance.marksTotal}</div>
                              </div> 
                              
                              
                              </div>
                              <div className="grid justify-end grid-cols-2 gap-8 mt-4" id="certData">
                                                                  
                              <div className="grid grid-cols-2">
                                  <div className="font-bold" id="enter">{t("Organization")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}><p style={{textAlign:'justify'}}>{Id_Data?.Certificate?.issuedBy?.organization?.name !== undefined && Id_Data.Certificate.issuedBy.organization.name}</p></div>
                              </div>
                              <div className="grid grid-cols-2">
                                  <div id="enter" className="font-bold">{t("School_Name")}</div>
                                  <div id="enterSemi" style={{wordBreak:'break-all'}}>: {Id_Data?.Certificate?.CertificateData?.school?.name !== undefined && Id_Data.Certificate.CertificateData.school.name}</div>
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
                                    {Id_Data !== undefined && Id_Data?.Certificate?.CertificateData?.performance?.subjects.map((item,indx)=>(
                                    <tr style={{background:indx%2 == 1 ? '#e6f7ff':''}}>
                                      <td style={{fontSize:'15px'}}>{item.name}</td>
                                      <td style={{fontSize:'15px'}}>{item.marksTheory}</td>
                                      <td style={{fontSize:'15px'}}>{item.marksPractical}</td>
                                      <td style={{fontSize:'15px'}}>{item.marksInternal}</td>
                                      <td style={{fontSize:'15px'}}>{item.marksTotal}</td>
                                    </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <div className='row w-100 ' style={{marginTop:'30px'}}>
                                <center>
                                  <p className='font-bold'><input type="checkbox"  onClick={()=>setConsent(!consent)}/> &nbsp; I confirm that I'm permitting my Certificate to upload in the Wallet</p>
                                </center>
                                <center>
                                {loader === false ?
                                  <button onClick={hadleAddToWallet} id="Proceed_button">Secure Your Data on Nambikkai Inaiyam</button>
                                :
                                  <img src={loading} alt="" id="loaderImg" style={{width:'70px'}} />
                                }
                                </center>
                              </div>

                          </div>
                        :
                          <div className='mt-5 row'>
                            <center>Processing..... </center>
                          </div>  
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

export default RegisterDocumentEduCert
