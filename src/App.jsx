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
  async function fetchAccessToken() {
    try {
      const accessToken = await getSpotifyAccessToken();
      return accessToken
    } catch (error) {
      console.error('Failed to get access token:', error);
    }
  }

  return (
    <>
      <Header />
      <Song 
        songName={songName}
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
