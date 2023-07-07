import type { Cloud } from '@/type'

const CLOUD_API = 'https://v0.yiketianqi.com/free/day?unescape=1&version=v61&appid=53266342&appsecret=mB1eOBjO'

export const queryCloud = async (): Promise<Cloud> => {
  try {
    const response = await fetch(CLOUD_API)
    if (response.ok) {
      const data: Cloud = await response.json()
      return data
    } else {
      const error = new Error(response.statusText)
      return Promise.reject(error)
    }
  } catch (error) {
    return Promise.reject(error)
  }
}
