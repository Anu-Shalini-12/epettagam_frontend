import React from 'react'
import { useNavigate } from 'react-router-dom'
import logoEdu from '../../Assets/Mask_Group_1.png'
import { useSelector } from 'react-redux'
import { AiOutlineArrowLeft } from "react-icons/ai";
import diploma from "../../Assets/oie_QFXeBttXblCe.png"
import { useTranslation } from "react-i18next";
import { BsQuestionCircle } from "react-icons/bs";

function RegistrationScreen() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

  const handleClick = (val) => {
    navigate('addDocument', { state: { id: val } })
  }

  const handleClickDiploma=(data)=>{
    sessionStorage.setItem('buttonFrom',data)
    if(data ===  "Marriage certificate"){
      navigate('/Certificate/MCert')
    }else if(data === "Death Certificate"){
      navigate('/Certificate/DCert')
    }else{
      navigate('/Certificate/BCert')
    }
  }

  return (
    <div className="flex flex-col" style={{ width: '100%' }}>
      <div className="ml-14 mt-14">
        <div className='d-flex'>
        <AiOutlineArrowLeft onClick={()=>navigate('/OurServices')} style={{fontWeight:'bold',fontSize:'25px',marginTop:'20px',marginRight:'20px',cursor:'pointer'}}/>
        <img alt='' src={logoEdu} id="imgEdu" />
        <p className="font-bold" style={{ fontSize: '18px',color:'#000000D8',marginTop:'20px' }}>
            {t("RDoc")}
          </p>
        </div>
        <div className="grid-cols-4 gap-4 mt-14" id="eduSection">
          <div className="px-4 border-2 border-transparent hover:border-inherit hover:py-4 hover:shadow-lg shadow-red-500 rounded-xl" id="boxflex" style={{cursor:'pointer'}}>
            <a href className="flex">
              <img alt='' src={logoEdu} id="imgEdu1"/>
              <a href id="statefont"
                className="ml-4 font-semibold "
                onClick={(e) => handleClickDiploma('Marriage certificate')}
              >
                {t("MCert")}
              </a>
            </a>
          </div>
          <div className="px-4 border-2 border-transparent hover:border-inherit hover:py-4 hover:shadow-lg shadow-red-500 rounded-xl" id="boxflex" style={{cursor:'pointer'}}>
            <a href className="flex">
              <img alt='' src={logoEdu} id="imgEdu1"/>
              <a href id="statefont"
                className="ml-4 font-semibold" 
                onClick={(e) => handleClickDiploma('Death Certificate')}
              >
                {t("DCERT")}
              </a>
            </a>
          </div>
          <div className="px-4 border-2 border-transparent hover:border-inherit hover:py-4 hover:shadow-lg shadow-red-500 rounded-xl" id="boxflex" style={{cursor:'pointer'}}>
            <a href className="flex">
              <img alt='' src={logoEdu} id="imgEdu1" />
              <a href id="statefont"
                className="ml-4 font-semibold"
                onClick={(e) => handleClickDiploma('Birth Certificate')}
              >
                {t("BCert")}
              </a>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationScreen
