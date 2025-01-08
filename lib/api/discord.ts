import { fetchData } from './fetch'

const enum DiscordStatus {
  Online = 'online',
  Idle = 'idle',
  Dnd = 'dnd',
}

export interface Lanyard {
  data: {
    discord_user: {
      id: string
      username: string
      discriminator: string
      avatar: string
    }
    discord_status: DiscordStatus
    active_on_discord_web: boolean
    active_on_discord_desktop: boolean
    active_on_discord_mobile: boolean
    listening_to_spotify: boolean
    activities: Activity[]
    success: boolean
  }
}

interface Activity {
  id: string
  name: string
  type: number
  state: string
  timestamps: {
    end: number
  }
  emoji: {
    name: string
  }
  created_at: number
}

const LANYARD_API = 'https://api.lanyard.rest/v1'
const DISCORD_USER_ID = '746724670757142530'

const headers = new Headers({
  'Content-Type': 'application/json',
  'cache-control': 'public, s-maxage=60, stale-while-revalidate=30',
})

export function getDiscordData() {
  return fetchData<Lanyard>(
    `${LANYARD_API}/users/${DISCORD_USER_ID}`,
    headers,
    30,
  )
}
