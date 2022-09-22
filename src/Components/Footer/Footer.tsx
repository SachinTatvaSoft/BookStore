import React from 'react'
import tatvasoft from "../../Assets/tatvasoft.png"

function Footer() {
  return (
    <div className='footer-main-container'>
      <div className='footer-content'>
      <img src={String(tatvasoft)} alt="logo" height={"50px"} width={"140px"} />
      <p className='footer-text'>Ⓒ 2015 Tatvasoft.com. All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer