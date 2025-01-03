import React, {useState} from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Song from './components/Song.jsx'
import getSpotifyAccessToken from './spotifyAuth.js'
import spotifyGetSong from './spotifyGetSong.js'
import spotifyGetArtist from './spotifyGetArtist.js'
import OtherInformation from './components/OtherInformation.jsx'

function App() {
  const hideShow = true
  const songName = "[Song Name Placeholder]"
  const artistName = "[Artist Placeholder]"
  const [accessToken, setAccessToken] = useState(null)
  const [songDetails, setSongDetails] = useState(null)
  const [artistDetails, setArtistDetails] = useState(null)
  
  React.useEffect(() => {
    async function fetchAndSetAccessToken() {
      try {
        const token = await getSpotifyAccessToken();
        setAccessToken(token);
      
        const song = await spotifyGetSong(accessToken, '6jgkEbmQ2F2onEqsEhiliL');
        setSongDetails(song);
        console.log('Fetched song details: ', song);

        const artist = await spotifyGetArtist(accessToken, '3Sz7ZnJQBIHsXLUSo0OQtM');
        setArtistDetails(artist);
        console.log('Fetched artist details: ', artist)

      } catch (error) {
        console.error('Failed to fetch Spotify Data', error);
      }
    }

    fetchAndSetAccessToken();
  }, []);
  
  return (
    <>
      <Header />
      <Song 
        songName={songDetails?.name || songName}
        albumArt={songDetails?.album.images[0].url}
        hideShow={hideShow}
      />
      <OtherInformation
        artistName={songDetails?.artists[0].name || artistName}
        profilePicture={artistDetails?.images[0].url}
        hideShow={hideShow}
        followers={artistDetails?.followers.total}
        genres={artistDetails?.genres}

      />
    </>
  )
}

export default App
