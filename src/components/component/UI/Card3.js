import React from 'react'

function Card1({ children }) {
  return (
    <div className="flex flex-col w-full p-8 m-12 border rounded-lg " id="cardDataDiploma" >
      {children}
    </div>
  )
}

export default Card1
