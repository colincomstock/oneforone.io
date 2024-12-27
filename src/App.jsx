import React, {useState} from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Artist from './components/Artist.jsx'
import Song from './components/Song.jsx'
import ArtistDescription from './components/ArtistDescription.jsx'

function App() {
  return (
    <>
      <Header />
      <Song />
      <div className='grid'>
        <Artist />
        <ArtistDescription />
      </div>
    </>
  )
}

export default App
