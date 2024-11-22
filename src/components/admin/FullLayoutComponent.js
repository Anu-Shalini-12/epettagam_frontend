import React from 'react';
import { Outlet } from 'react-router-dom'
import NambiLogoImg from '../../Assets/smallLogo.png';

const FullLayoutComponent =({children})=>{
    return (
        <div className="rootAdmin d-flex">
            <div className="leftArea" >
                <div className="d-flex">
                    <img alt='' src={NambiLogoImg} style={{width:'6rem'}} />
                    <div className='text-white NabiTitle' style={{marginTop:'2rem',fontSize:'1.2rem',fontWeight:'bold',marginLeft:'1rem'}}>
                        <div className='mainTitle'>TNeGA</div>
                        <div className='subtitle'>Nambikkai Inaiyam</div>
                    </div>

                </div>
            </div>
            <div className="rightArea">
                <Outlet/>
            </div>
        </div>
    )
}
export default FullLayoutComponent