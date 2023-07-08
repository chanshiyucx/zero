import Image from 'next/image'
import { FC } from 'react'
import './index.css'
import Loading from '@/assets/images/loading.png'

const Spinner: FC = () => {
  return (
    <span className="spinner-wrap">
      <span className="spinner">
        <Image className="prospect" src={Loading} alt="Loading..." />
        <span className="background">
          <Image className="background" src={Loading} alt="Loading..." />
        </span>
      </span>
    </span>
  )
}

export default Spinner
