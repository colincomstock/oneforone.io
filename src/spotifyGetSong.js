// Depreciated function to get song info from Spotify API, moved to cloudflare worker

export default async function spotifyGetSong(accessToken, trackId) {
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching track: ${response.statusText}`);
    }

    const trackData = await response.json();

    return trackData;
}