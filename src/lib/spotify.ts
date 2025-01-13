import SpotifyWebApi from 'spotify-web-api-node'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const CACHE_TTL = 60 * 60 * 24 * 7 // 1 week in seconds

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

let tokenExpirationTime = 0

async function ensureValidToken() {
  if (Date.now() > tokenExpirationTime) {
    const data = await spotifyApi.clientCredentialsGrant()
    spotifyApi.setAccessToken(data.body.access_token)
    tokenExpirationTime = Date.now() + data.body.expires_in * 1000
  }
}

export async function getTrackImage(title: string, artist: string): Promise<string | null> {
  const cacheKey = `spotify:image:${title}:${artist}`

  try {
    // Check cache first
    const cachedUrl = await redis.get<string>(cacheKey)
    if (cachedUrl) return cachedUrl

    // If not in cache, fetch from Spotify
    await ensureValidToken()
    const searchResult = await spotifyApi.searchTracks(`track:${title} artist:${artist}`)
    const imageUrl = searchResult.body.tracks?.items[0]?.album.images[0]?.url || null

    // Cache the result if we found an image
    if (imageUrl) {
      await redis.set(cacheKey, imageUrl, { ex: CACHE_TTL })
    }

    return imageUrl
  } catch (error) {
    console.error('Spotify API error:', error)
    return null
  }
} 