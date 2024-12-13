import { env } from '@/env'
import { fetchData } from './fetch'

const headers = new Headers({
  Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString('base64')}`,
})

export interface Wakatime {
  data: {
    decimal: string
    digital: string
    is_up_to_date: boolean
    percent_calculated: number
    range: {
      end: string
      end_date: string
      end_text: string
      start: string
      start_date: string
      start_text: string
      timezone: string
    }
    text: string
    timeout: number
    total_seconds: number
  }
}

export async function getCodingHrs() {
  const url = 'https://wakatime.com/api/v1/users/current/all_time_since_today'
  return fetchData<Wakatime>(url, headers)
}
