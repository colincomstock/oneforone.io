// Depreciated function to get artist info from Spotify API, moved to cloudflare worker

export default async function spotifyGetArtist(accessToken, artistId) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching artist: ${response.statusText}`);
    }

    const artistData = await response.json();

    return artistData;
}