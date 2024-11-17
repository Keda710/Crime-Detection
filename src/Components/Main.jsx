import React from 'react'
import videoBg from '../assets/bg.mp4'

const Main = () => {
  return (
    <div className='mainn'>
        <div className="overlay"></div>
        <video src={videoBg} autoPlay loop muted />
    </div>
  )
}

export default Main;