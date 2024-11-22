import React from 'react'

function ButtonFill({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-2 px-4 text-white " style={{width:'100%',borderRadius:'7px',marginTop:'10px',background:"#144272"}}
    >
      {children}
    </button>
  )
}

export default ButtonFill
