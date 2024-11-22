import React from 'react'
import { useNavigate } from 'react-router-dom'
import logoEdu from '../../Assets/Mask_Group_1.png'
import { AiOutlineArrowLeft } from "react-icons/ai";
import diploma from "../../Assets/oie_QFXeBttXblCe.png"
import { useTranslation } from "react-i18next";
import { BsQuestionCircle } from "react-icons/bs";

function ECertificatesHome() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

  const handleClick = (val) => {
    navigate('addDocument', { state: { id: val } })
  }

  const handleClickDiploma=(data)=>{
    sessionStorage.setItem('buttonFrom',data)
    navigate('/Diploma/')
  }

  return (
    <div className="flex flex-col" style={{ width: '100%' }}>
      <div className="flex ml-10" style={{marginTop:'10px'}}>
        <AiOutlineArrowLeft onClick={()=>navigate('/OurServices')} style={{fontWeight:'bold',fontSize:'25px',marginTop:'26px',marginRight:'20px',cursor:'pointer'}}/>
        <img alt='' src={logoEdu} id="imgEdu" /> 
        <p className="font-bold fontEdu" id ="enter">
          {t("tn1")}
        </p>
      </div>
      <div className="ml-14 mt-14">
        <div>
          <p className="font-bold" style={{ fontSize: '18px',color:'#000000D8' }}>
            {t("directorMedicalEdu")}
          </p>
        </div>
        <div className="grid-cols-4 gap-4 mt-4" id="eduSection">
          <div className="px-4 border-2 border-transparent hover:border-inherit hover:py-4 hover:shadow-lg shadow-red-500 rounded-xl" id="boxflex" style={{cursor:'pointer'}}>
            <a href className="flex">
              <img alt='' src={diploma} id="imgEdu1"/>
              <a href id="statefont5"
                className="ml-4 font-semibold "
                onClick={() => handleClickDiploma('Diploma In General Nursing And Midwifery')}
              >
                {t("nursing")}
              </a>
            </a>
          </div>
          <div className="px-4 border-2 border-transparent hover:border-inherit hover:py-4 hover:shadow-lg shadow-red-500 rounded-xl" id="boxflex" style={{cursor:'pointer'}}>
            <a href className="flex">
              <img alt='' src={diploma} id="imgEdu1"/>
              <a href id="statefont"
                className="ml-4 font-semibold "
                onClick={() => handleClickDiploma('Diploma In Pharmacy')}
              >
                {t("pharmacy")}
              </a>
            </a>
          </div>
        </div>
      </div>
      <div className="ml-14 mt-14">
        <div>
          <p className="font-bold" style={{ fontSize: '18px',color:'#000000D8' }}>
            {t("stateBoard")}
          </p>
        </div>
        <div className="grid-cols-4 gap-4 mt-4" id="eduSection">
          <div className="px-4 border-2 border-transparent hover:border-inherit hover:py-4 hover:shadow-lg shadow-red-500 rounded-xl" id="boxflex" style={{cursor:'pointer'}}>
            <a href className="flex">
              <img alt='' src={logoEdu} id="imgEdu1"/>
              <a href id="statefont"
                className="ml-4 font-semibold "
                onClick={(e) => handleClick('ssc')}
              >
                {t("tnx")}
              </a>
            </a>
          </div>
          <div className="px-4 border-2 border-transparent hover:border-inherit hover:py-4 hover:shadow-lg shadow-red-500 rounded-xl" id="boxflex" style={{cursor:'pointer'}}>
            <a href className="flex">
              <img alt='' src={logoEdu} id="imgEdu1"/>
              <a href id="statefont"
                className="ml-4 font-semibold" 
                onClick={(e) => handleClick('hscxi')}
              >
                {t("tnxi")}
              </a>
            </a>
          </div>
          <div className="px-4 border-2 border-transparent hover:border-inherit hover:py-4 hover:shadow-lg shadow-red-500 rounded-xl" id="boxflex" style={{cursor:'pointer'}}>
            <a href className="flex">
              <img alt='' src={logoEdu} id="imgEdu1" />
              <a href id="statefont"
                className="ml-4 font-semibold"
                onClick={(e) => handleClick('hsc')}
              >
                {t("tnxii")}
              </a>
            </a>
          </div>
        </div>
      </div>
      <div className='mt-4' style={{width:'82%',marginLeft:'6%',backgroundColor:'#FFF5EE',padding:'10px'}}>
              <span style={{display:'flex',color:'red'}}><BsQuestionCircle style={{color:'red',marginTop:'3px',marginRight:'5px'}}/> {t("disc")} </span>
              <span>{t("eduDisc")}</span>
            </div>
    </div>
  )
}

export default ECertificatesHome
