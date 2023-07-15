import React from 'react'
import './index.css'
import Loading from '@/assets/images/loading.png'

type GenshinProps = {}

const Genshin: React.FC<GenshinProps> = () => {
  return (
    <span className="flex justify-center items-center mt-28 mb-24">
      <span className="spinner">
        <img className="prospect" src={Loading} alt="Loading..."></img>
        <span className="background">
          <img src={Loading} alt="Loading..."></img>
        </span>
      </span>
    </span>
  )
}

export default Genshin
