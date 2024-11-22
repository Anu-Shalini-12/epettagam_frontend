import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { GetCertificateDetails } from '../store/certificates/action'
import CustomModal from '../Modal/CustomModal'
import logoDoc from '../../Assets/Mask_Group_1.png'
import 'react-responsive-modal/styles.css'
import CertificateTab from '../Modal/CertificateTab'
import loader from '../../Assets/Loading_2.gif'
import 'react-toastify/dist/ReactToastify.css';
import {toast,ToastContainer} from 'react-toastify';
import { getSevCert } from '../store/certificates/action'
import Swal from 'sweetalert2'
import { reverse } from 'd3'


function Registration() {
  let loginData = useSelector((store) => store.certificate.otp_verification)
  let certDetails = useSelector((store) => store.certificate.certDetails.data)
  let certDetails_err = useSelector((store) => store.certificate.certDetail_err)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let openModal = useSelector((store) => store.certificate.openModal)
  const [SubLoader,setLoader] = useState(false)
  const [dept,setDept] = useState(location.state?.id)
  const [errors, setError] = useState({name: '',rollNo: '',yop: '',dob: '',flag: '',certType: '',month: ''})
  const [formData, setFormData] = useState({name: sessionStorage.getItem('username'),rollNo: '',yop: '',dob:sessionStorage.getItem('dob'),flag: '',certType: 'REGULAR',month: ''})
  const [dataRec, setDataRec] =useState('')
  const [consent, setconsent] = useState('')
  const { name, rollNo, yop, certType, month } = formData
  const [startDate, setStartDate] = useState(sessionStorage.getItem('dob'));
  const [setDate] = useState(undefined)
  const [open, setOpen] = useState(false)
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  const now = new Date().getUTCFullYear();    
  const years = Array(now - (now - 20)).fill('').map((v, idx) => now - idx);
  let EduCert = useSelector((store) => store.certificate.getAll_sevcert.data)

  
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

  



  const handleChangename=(e)=>{  
    let value = e.target.value  
    // value = value.replace(/[^A-Za-z]/ig, '')  
    setFormData((prev) => ({ ...prev, name:  value }))
  }

  const handleChangeDate=(e)=>{
    setStartDate(e.target.value)
  }

  useEffect(() => {
  }, [dept])
  return (
    <div style={{ width: '100%' }}>
      <ToastContainer/>
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
            <div className="flex mt-2 ml-6" style={{paddingTop:'20px'}}>
              <img alt='' src={logoDoc} />
              <p className="mt-4 font-bold" id="enter" style={{fontSize: '20px'}}>
               &nbsp; Registration Certificates
              </p>
            </div>
            <div className="mt-10 ml-16" >
              <div className="grid grid-cols-2 " id="formField">
                <div>
                  <label className="mb-4 font-bold" id="enter">Roll Number</label>
                  <br/>
                  <input
                    className="w-3/4 p-2 mt-2 rounded-lg bg-slate-200"
                    style={{border:'none',fontSize:'15px',outline:'none'}}
                    id="rollNo"
                    type="number"
                    name="rollNo"
                    placeholder="Enter Your Roll Number"
                    value={rollNo}
                    onChange={handleChange}
                  />
                  <br/>
                  { errors.rollNo !== '' && errors.errors.rollNo === "This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>This is a required field</p>}
                </div>
                <div>
                  <label className="mb-4 font-bold" id="enter">Enter Name</label>
                  <br/>
                <input
                  className="w-3/4 p-2 mt-2 border rounded-lg bg-slate-200"
                  style={{border:'none',fontSize:'15px',outline:'none'}}
                  type="text"
                  id="name"
                  value={name}
                  placeholder="Enter a name"
                  onChange={handleChangename}
                />
                {errors.name !== '' && errors.errors.name === "This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>This is a required field</p>}
                </div>
              </div>
            </div>
            <div className="mt-8 ml-16">
              <div className="grid grid-cols-2 " id="formField">
                <div>
                  <label className="mb-4 font-bold" id="enter">Year Of Passing</label><br/>
                  <select
                    type="text"
                    id="yop" style={{border:'none',fontSize:'15px',outline:'none'}}
                    className="w-3/4 p-2 mt-2 border rounded-lg bg-slate-200"
                    value={yop}
                            onChange={handleChange}
                          >
                            <option>Select</option>
                            
                            {years.length !== 0 &&
                              years.map((id) => (
                                <option id style={{ color: 'black' }}>
                                  {' '}
                                  {id}
                                </option>
                              ))
                        }
                    </select>
                  {errors.yop !== '' && errors.errors.yop === "This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>This is a required field</p>}
                </div>
                <div>
                  <label className="mb-4 font-bold" id="enter">Registration Number</label>
                  <br/>
                  <input
                  className="w-3/4 p-2 mt-2 border rounded-lg bg-slate-200"
                  disabled style={{border:'none',fontSize:'15px',outline:'none'}}
                  type="text"
                  id="certType"
                  value={certType}
                  placeholder="Enter a certificate type"
                  onChange={handleChange}
                />
                </div>
              </div>
            </div>
            <div className="mt-8 mb-10 ml-16">
              <div className="grid grid-cols-2" id="formField">
                <div>
                  <label className="mb-4 font-bold" id="enter">Date Of Birth</label>
                  <br/>
                  <input id="Dobinput"
                  className="p-2 mt-2 border rounded-lg bg-slate-200"
                   style={{border:'none',fontSize:'15px',outline:'none',height:'36px'}}
                  type="text"
                  disabled
                  value={startDate}
                  placeholder="Enter a certificate type"
                  onChange={handleChangeDate}
                />
                {errors.dob !== '' && errors.errors.dob === "This is a required field" &&
                <p className="text-xs" style={{color:'red'}}>This is a required field</p>}
                </div>
                <div>
                  <label className="mb-4 font-bold" id="enter">Data Format</label> <br/>
                    <select
                    type="text"
                    id="month"
                    style={{border:'none',fontSize:'15px',outline:'none'}}
                    className="w-3/4 p-2 mt-2 border rounded-lg bg-slate-200"
                    value={month}
                            onChange={handleChange}
                          >
                            <option>Select</option>
                            <option value="pdf">PDF</option>
                            <option value="xml">XML</option>
                    </select>
                  {errors.month !== '' && errors.errors.month ==="This is a required field" &&
                  <p className="text-xs" style={{color:'red'}}>This is a required field</p>}
                </div>
              </div>
            </div>
            <div className="mt-8 mb-10 ml-16">
            
              <a href className="cancelbutton" id="submitButton"
                onClick={()=>navigate('/OurServices')}
                >
                  Cancel
                </a>
              {SubLoader === true ?
                <img alt='' src={loader} style={{width:'50px',marginLeft:'85%'}} />
              :
                <a href id="submitButton"
                style={{marginLeft:'1%'}}
                  onClick={()=>navigate('otp')} 
                  className=""
                >
                  Submit
                </a>
              }
            </div>
          </div>
        </>
      
      {openModal && (
        <CustomModal
          openModal={openModal}
          onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
        >
          <CertificateTab dataRec={dataRec} EduCert={EduCert}  urlData={location.state.id} loginData={loginData} certificate={certDetails} />
        </CustomModal>
      )}
    </div>
  )
}

export default Registration
