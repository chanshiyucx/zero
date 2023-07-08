import Image from 'next/image'
import { FC } from 'react'
import './index.css'
import Loading from '@/assets/images/loading.png'

const Spinner: FC = () => {
  return (
    <span className="mb-24 mt-28 flex items-center justify-center">
      <span className="spinner">
        <Image className="prospect" src={Loading} alt="Loading..." />
        <span className="background">
          <Image src={Loading} alt="Loading..." />
        </span>
      </span>
    </span>
  )
}

export default Spinner
