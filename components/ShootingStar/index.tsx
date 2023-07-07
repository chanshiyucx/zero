import { FC } from 'react'
import './index.css'

const ShootingStar: FC = () => {
  const starArr = new Array(4).fill(0)
  return (
    <div className="absolute z-0 h-full w-full rotate-45 transform">
      {starArr.map((_, i) => (
        <div key={i} className="shooting_star"></div>
      ))}
    </div>
  )
}

export default ShootingStar
