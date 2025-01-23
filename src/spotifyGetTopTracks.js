// Depreciated function to get top tracks info from Spotify API, moved to cloudflare worker

export default async function spotifyGetTopTracks(accessToken, artistId) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching top tracks: ${response.statusText}`);
    }

    const topTracksData = await response.json();

    return topTracksData;
}