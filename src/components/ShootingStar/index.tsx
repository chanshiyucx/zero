import React from 'react'
import './index.css'

type ShootingStarProps = {}

const ShootingStar: React.FC<ShootingStarProps> = () => {
  const starArr = new Array(3).fill(0)
  return (
    <div className="absolute z-0 w-full h-full transform rotate-45">
      {starArr.map((_, i) => (
        <div key={i} className="shooting_star"></div>
      ))}
    </div>
  )
}

export default ShootingStar
