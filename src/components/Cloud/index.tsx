import React, { useState, useEffect } from 'react'
import { Thunder, Rain, Snow, Sun, Sunshine, Windy } from '@components/Icons'
import { queryCloud } from '@utils/service'

type CloudProps = {}

const renderCloudIcon = (code: string): React.ReactElement => {
  if (code === 'qing') {
    // 晴
    return <Sunshine />
  } else if (code === 'yun' || code === 'yin' || code === 'wu') {
    // 多云
    return <Sun />
  } else if (code === 'lei') {
    // 阵雨
    return <Thunder />
  } else if (code === 'yu') {
    // 大雨
    return <Rain />
  } else if (code === 'xue') {
    // 雪
    return <Snow />
  } else {
    // 大风
    return <Windy />
  }
}

const Cloud: React.FC<CloudProps> = () => {
  const [city, setCity] = useState('')
  const [temperature, setTemperature] = useState('26')
  const [weather, setWeather] = useState('晴')
  const [code, setCode] = useState('qing')

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
    <div className="fixed hidden lg:flex top-3 right-3 items-center z-10">
      {renderCloudIcon(code)}
      <div className="flex flex-col justify-center px-1.5 transform">
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
