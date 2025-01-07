import React, {useState} from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Song from './components/Song.jsx'
import getSpotifyAccessToken from './spotifyAuth.js'
import spotifyGetSong from './spotifyGetSong.js'
import spotifyGetArtist from './spotifyGetArtist.js'
import spotifyGetTopTracks from './spotifyGetTopTracks.js'
import OtherInformation from './components/OtherInformation.jsx'
import { readFromDatabase, writeToDatabase } from './firebaseOperations.js'

function App() {
  const songName = "[Song Name Placeholder]"
  const artistName = "[Artist Placeholder]"
  const [accessToken, setAccessToken] = useState(null)
  const [songDetails, setSongDetails] = useState(null)
  const [artistDetails, setArtistDetails] = useState(null)
  const [topTracks, setTopTracks] = useState(null)
  const [spotifyTrackId, setSpotifyTrackId] = useState(null)
  const [spotifyLink, setSpotifyLink] = React.useState('')

  const isValidLink = spotifyLink.includes('open.spotify.com/track/')

  // Handles link input, function to be passed down to Header component
  function handleLink(link) {
    setSpotifyLink(link);
  }

  // Logic for checking for valid link on each state change to input field
  React.useEffect(() => {
    
    function linkStripper() {
      const startIndex = spotifyLink.indexOf("/track/") + 7;
      const endIndex = spotifyLink.indexOf("?", startIndex) !== 1 ? spotifyLink.indexOf("?", startIndex) : spotifyLink.length;
      const trackId = spotifyLink.substring(startIndex, endIndex);
      setSpotifyTrackId(trackId);
    }
    
    function linkValidator() {
      if (isValidLink){
        linkStripper();

      } else {
        setSpotifyTrackId(null);
      }
    }

    linkValidator();
  }, [spotifyLink, isValidLink])
  
  // Logic for triggering song details fetch on valid link
  React.useEffect(() => {
    async function fetchSongDetails(){
      if (accessToken && spotifyTrackId){
        const song = await spotifyGetSong(accessToken, spotifyTrackId);
        setSongDetails(song);
        console.log('Fetched song details: ', song);
      }
    }

    fetchSongDetails();
    
  }, [spotifyTrackId]);

  // Logic for triggering artist detail fetch on valid link and valid song details
  React.useEffect(() => {
    async function fetchArtistDetails() {
      if (songDetails) {
        const artist = await spotifyGetArtist(accessToken, songDetails?.artists[0].id);
        setArtistDetails(artist);
        console.log('Fetched artist details: ', artist);
      }
    }

    fetchArtistDetails();
  }, [songDetails]);

  // Logic for triggering artist top song detail fetch on valid link and song details
  React.useEffect(() => {
    async function fetchTopTracks() {
      if (songDetails) {
        const topTracks = await spotifyGetTopTracks(accessToken, songDetails?.artists[0].id);
        setTopTracks(topTracks);
        console.log('Fetched top tracks: ', topTracks);
      }
    }

    fetchTopTracks();
  }, [songDetails]);

  // Logic for triggering access token fetch from spotify API on load
  React.useEffect(() => {
    async function fetchAndSetAccessToken() {
        try {
          const token = await getSpotifyAccessToken();
          setAccessToken(token);
        } catch (error) {
          console.error('Failed to fetch Spotify Data', error);
        }
      }

    fetchAndSetAccessToken();
  }, []);
  
  return (
    <>
      <Header 
        onLinkChange={handleLink}
      />
      <Song 
        songName={songDetails?.name || songName}
        albumArt={songDetails?.album.images[0].url}
        hideShow={isValidLink}
      />
      <OtherInformation
        artistName={songDetails?.artists[0].name || artistName}
        profilePicture={artistDetails?.images[0].url}
        hideShow={isValidLink}
        followers={artistDetails?.followers.total}
        genres={artistDetails?.genres || []}
        topTracks={topTracks?.tracks || []}

      />
    </>
  )
}

export default App
