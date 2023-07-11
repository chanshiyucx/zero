import { StaticImageData } from 'next/image'

export type Weather = 'qing' | 'yun' | 'yin' | 'wu' | 'lei' | 'yu' | 'xue' | 'shachen' | 'bingbao'

export interface Cloud {
  nums: number
  cityid: string
  city: string
  date: string
  week: string
  update_time: string
  wea: string
  wea_img: Weather
  tem: string
  tem_day: string
  tem_night: string
  win: string
  win_speed: string
  win_meter: string
  air: string
  pressure: string
  humidity: string
}

export type ThemeType = 'Hutao' | 'Keqing' | 'Ganyu' | 'Beelzebul' | 'Ayaka' | 'Yoimiya' | 'Kokomi' | 'Nahida'

export interface Theme {
  type: ThemeType
  name: string
  description: string
  color: {
    primary: string
    background: string
  }
  image: StaticImageData
  url: string
}

export interface Inspiration {
  title: string
  raw: string
  code: string
}
