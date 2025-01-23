//Depreciated function to get Spotify access token, moved to cloudflare worker

export default async function getSpotifyAccessToken() {
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
      return data.access_token;
    } catch (error) {
      console.error('Error fetching Spotify access token:', error);
      throw error;
    }
  }
  