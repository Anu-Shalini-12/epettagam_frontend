import React from 'react'

function Card({ children }) {
  return (
    <div className="flex flex-col w-full p-8 m-12 border rounded-lg " id="cardData" style={{backgroundImage: 'linear-gradient(to right, #F9FCFFC1 , #e6ecf7)',boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'}}>
      {children}
    </div>
  )
}

export default Card
