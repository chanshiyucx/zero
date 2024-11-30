enum status {
  online,
  idle,
  dnd,
}

interface Lanyard {
  data: {
    discord_user: {
      id: string
      username: string
      discriminator: string
      avatar: string
    }
    discord_status: status
    active_on_discord_web: boolean
    active_on_discord_desktop: boolean
    active_on_discord_mobile: boolean
    listening_to_spotify: boolean
    activities: {
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
    }[]
    success: boolean
  }
}

export async function getDiscordData() {
  const response = await fetch(
    'https://api.lanyard.rest/v1/users/746724670757142530',
    {
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    },
  )
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const result: Lanyard = await response.json()
  return result
}
