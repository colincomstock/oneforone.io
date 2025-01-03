import React, {useState} from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Artist from './components/Artist.jsx'
import Song from './components/Song.jsx'
import ArtistDescription from './components/ArtistDescription.jsx'
import testPfp from "./assets/test_pfp.jpg" 
import getSpotifyAccessToken from './spotifyAuth.js'
import spotifyGetSong from './spotifyGetSong.js'

function App() {
  const hideShow = true
  const songName = "[Song Name Placeholder]"
  const artistName = "[Artist Placeholder]"
  const [accessToken, setAccessToken] = useState(null)
  const [songDetails, setSongDetails] = useState(null)
  
  React.useEffect(() => {
    async function fetchAndSetAccessToken() {
      try {
        const token = await getSpotifyAccessToken();
        setAccessToken(token);
      
        const song = await spotifyGetSong(token, '1VFV9nzCsSZYPaU1NBjJZD');
        setSongDetails(song);
        console.log('Fetched song details: ', song);
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
        songName={songDetails.name || songName}
        hideShow={hideShow}
      />
      <div className='grid'>
        <Artist 
          artistName={artistName}
          profilePicture={testPfp}
          hideShow={hideShow}
        />
        <ArtistDescription 
          hideShow={hideShow}
        />
        
      </div>
    </>
  )
}

export default App
