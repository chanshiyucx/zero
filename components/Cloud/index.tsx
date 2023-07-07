'use client'

import type { Weather } from '@/type'
import { FC, useEffect, useState } from 'react'
import { Rain, Snow, Sun, Sunshine, Thunder, Windy } from '@/components/Icons'
import { queryCloud } from '@/utils/service'

const weatherComponents: Record<Weather, React.ReactElement> = {
  qing: <Sunshine />,
  yun: <Sun />,
  yin: <Sun />,
  wu: <Sun />,
  lei: <Thunder />,
  yu: <Rain />,
  xue: <Snow />,
  shachen: <Windy />,
  bingbao: <Windy />,
}

const Cloud: FC = () => {
  const [city, setCity] = useState('')
  const [temperature, setTemperature] = useState('26')
  const [weather, setWeather] = useState('晴')
  const [code, setCode] = useState<Weather>('qing')

  useEffect(() => {
    queryCloud().then((data) => {
      const { city: cityName, wea, wea_img, tem } = data
      setCity(cityName)
      setTemperature(tem)
      setWeather(wea)
      setCode(wea_img)
    })
  }, [])

  return (
    <div className="fixed right-3 top-3 hidden items-center lg:flex">
      {weatherComponents[code]}
      <div className="flex transform flex-col justify-center px-1.5">
        <span className="text-base leading-4">{temperature}℃</span>
        <span className="text-xs">
          {city && `${city}·`}
          {weather}
        </span>
      </div>
    </div>
  )
}

export default Cloud
