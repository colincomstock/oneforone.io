export default {
    async fetch(request, env) {
        try {
            const url = new URL(request.url);
            const trackId = url.searchParams.get('trackId');
            const response = await getSpotifyAccessToken(env, trackId);
            return new Response(response.body, {
                ...response,
                headers: {
                    ...response.headers,
                    'Access-Control-Allow-Origin': '*', 
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization', 
                    'Content-Type': 'application/json;charset=UTF-8', 
                },
            });
        } catch (error) {
            return new Response('Internal Server Error', { status: 500 });
        }
    }
};

async function getSpotifyAccessToken(env, trackId) {
    const clientId = env.SPOTIFY_CLIENT_ID;
    const clientSecret = env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return new Response('Client ID or Client Secret is missing', { status: 500 });
    }

    const url = 'https://accounts.spotify.com/api/token';
    const authString = `${clientId}:${clientSecret}`;
    const base64Auth = btoa(authString);

    const headers = new Headers({
        'Authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams({ grant_type: 'client_credentials' });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body,
        });

        if (!response.ok) {
            const errorText = await response.text();
            return new Response(`HTTP error! status: ${response.status}, details: ${errorText}`, { status: response.status });
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

        return new Response(JSON.stringify(allResponses), {
            headers: { 'content-type': 'application/json;charset=UTF-8' },
        });
    } catch (error) {
        return new Response('Error fetching Spotify access token', { status: 500 });
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