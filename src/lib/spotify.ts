import SpotifyWebApi from 'spotify-web-api-node'

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
  try {
    await ensureValidToken()
    const searchResult = await spotifyApi.searchTracks(`track:${title} artist:${artist}`)
    return searchResult.body.tracks?.items[0]?.album.images[0]?.url || null
  } catch (error) {
    console.error('Spotify API error:', error)
    return null
  }
} 