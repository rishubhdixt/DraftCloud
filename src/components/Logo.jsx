import React from 'react'
import logoImg from '../assets/ll.webp'

function Logo({width='100px'}) {
  return (
    <div>
       <img 
         src={logoImg} 
         alt="Logo" 
         style={{ 
           width, 
           borderRadius: '50%' 
         }} 
       />
    </div>
  )
}

export default Logo
