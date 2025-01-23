// Depreciated test function used to prototype the logic for combining all Spotify API calls into a single function, moved to cloudflare worker

export default async function getSpotifyInfo(trackId) {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Client ID or Client Secret is missing');
    }
  
    const url = 'https://accounts.spotify.com/api/token';
    const authString = `${clientId}:${clientSecret}`;
    const base64Auth = btoa(authString);
  
    const headers = {
      'Authorization': `Basic ${base64Auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  
    const body = new URLSearchParams({ grant_type: 'client_credentials' });
  
    console.log('Request Headers:', headers);
    console.log('Request Body:', body.toString());
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Fetch error details
        console.error('Spotify API Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }
  
    const data = await response.json();
    const token = data.access_token;
    console.log(token)

    const trackEndpoint = `tracks/${trackId}`;

    const trackResponse = await getSpotifyEndpointData(token, trackEndpoint);

    const artistId = trackResponse?.artists[0].id

    const artistEndpoint = `artists/${artistId}`;
    const topTracksEndpoint = `artists/${artistId}/top-tracks`;

    const artistResponse = await getSpotifyEndpointData(token, artistEndpoint);
    const topTracksResponse = await getSpotifyEndpointData(token, topTracksEndpoint);

    const allResponses = {
        trackResponse,
        artistResponse,
        topTracksResponse,
    };

    return allResponses;
    
    } catch (error) {
      console.error('Error fetching Spotify access token:', error);
      throw error;
    }
  }


async function getSpotifyEndpointData(accessToken, endpoint) {
    const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching data from endpoint ${endpoint}: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
}