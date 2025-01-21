export default {
    async fetch(request, env) {
        try {
            const response = await getSpotifyAccessToken(env);
            return new Response(response.body, {
                ...response,
                headers: {
                    ...response.headers,
                    'Access-Control-Allow-Origin': '*', // Allow all origins
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allow specific methods
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow specific headers
                },
            });
        } catch (error) {
            return new Response('Internal Server Error', { status: 500 });
        }
    }
};

async function getSpotifyAccessToken(env) {
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
        return new Response(JSON.stringify(data), {
            headers: { 'content-type': 'application/json;charset=UTF-8' },
        });
    } catch (error) {
        return new Response('Error fetching Spotify access token', { status: 500 });
    }
}