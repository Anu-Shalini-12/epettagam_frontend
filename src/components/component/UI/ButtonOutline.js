import React from 'react'

function ButtonOutline({ children }) {
  return (
    <button className="p-2 px-4 font-bold border-2 rounded-full " style={{border:'2px solid #154272',color:'#154272'}}>
      {children}
    </button>
  )
}

export default ButtonOutline
