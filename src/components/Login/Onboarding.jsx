import React from 'react'
import banner from '../../Assets/Group 1404.png'
import logo from '../../Assets/Mask_Group_1.png'
import '../../style/style.css'
import { useNavigate } from 'react-router-dom'
import ParticleBackground from 'react-particle-backgrounds'

function Onboarding() {
  const navigate = useNavigate()
  const settings = {
    canvas: {
      canvasFillSpace: true,
      width: 200,
      height:600,
      useBouncyWalls: false
    },
    particle: {
      particleCount: 50,
      color: '#94ecbe',
      minSize: 6,
      maxSize: 8
    },
    velocity: {
      directionAngle: 0,
      directionAngleVariance: 360,
      minSpeed: 1,
      maxSpeed: 3
    },
    opacity: {
      minOpacity: 0,
      maxOpacity: 0.5,
      opacityTransitionTime: 3000
    }
  }

  return (
    <div style={{ width: '100%' }}>
    <ParticleBackground settings={settings} />
      <div className="flex grid grid-cols-2" id="contTop">
        <div>
          <div className="mt-48 ml-28" id="boxboard">
            <div className="flex">
              <img src={logo} id="imgLogo" />
              <p className="mt-4 ml-3 text-3xl font-bold dataTamil" id="enter">
              Tamil Nadu Government Certificate
              </p>
            </div>
            <div style={{ marginLeft: '20%' }}>
              <p
                id="enterSemi"
                className="text-xl textmain"
                style={{ color: '#4A575F' }}
              >Access your state sanctioned 
              education certificates on demand
                and share them instantly for verification
              </p>
              
            </div>
          </div>
        </div>
        <div>
          <div style={{display:'flex',marginTop:'20px'}}>
          <a
              onClick={() => navigate('/')}
              id="enter"
              style={{
                cursor: 'pointer',
                marginLeft: '74%',
                color: '#144272',
                fontSize: '20px',
              }}
            >
              Skip 
            </a>
          <a
            onClick={() => navigate('/Onboarding1')}
            id="enter"
            style={{
              cursor: 'pointer',
              marginLeft: '20px',
              color: '#144272',
              fontSize: '20px',
            }}
          >
            Next
          </a>
          </div>
          <img src={banner} className="mt-8" style={{ width: '79%' }} />
        </div>
      </div>
    </div>
  )
}

export default Onboarding
