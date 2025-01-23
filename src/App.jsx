import React, {useState} from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Song from './components/Song.jsx'
import UserGuide from './components/userGuide.jsx'
import Blocker from './components/Blocker.jsx'
import OtherInformation from './components/OtherInformation.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const songName = "[Song Name Placeholder]"
  const artistName = "[Artist Placeholder]"
  const [songDetails, setSongDetails] = useState(null)
  const [artistDetails, setArtistDetails] = useState(null)
  const [topTracks, setTopTracks] = useState(null)
  const [spotifyTrackId, setSpotifyTrackId] = useState(null)
  const [spotifyLink, setSpotifyLink] = React.useState('')
  const [messageState, setMessageState] = React.useState('onEnter')
  const [loading, setLoading] = React.useState(true)

  const isValidLink = spotifyLink.includes('open.spotify.com/track/')

  React.useEffect(() => {
    if (isValidLink) {
      setMessageState('onPreview')
    }
  }, [spotifyTrackId, isValidLink])

  function submitMessageHandler() {
    setMessageState('onSubmit');
  }

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

    function toggleBodyScroll(isValid) {
      document.body.style.overflow = isValid ? 'auto' : 'hidden';
    }
    
    function linkValidator() {
      if (isValidLink){
        linkStripper();

      } else {
        setSpotifyTrackId(null);
      }
    }

    toggleBodyScroll(isValidLink)
    linkValidator();
  }, [spotifyLink, isValidLink])
  
  // Logic for triggering song details fetch on valid link
  React.useEffect(() => {
    setLoading(true)
    async function fetchSpotifyInfo() {
      if (!spotifyTrackId) return;

      try {
        const response = await fetch(
          `https://oneforone-basic-auth.comstockcolin.workers.dev/?trackId=${encodeURIComponent(spotifyTrackId)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const allResponses = await response.json();
        console.log(allResponses);
        setSongDetails(allResponses.trackResponse);
        setArtistDetails(allResponses.artistResponse);
        setTopTracks(allResponses.topTracksResponse);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchSpotifyInfo();
  }, [spotifyTrackId]);
  
  return (
    <>
      <Header 
        onLinkChange={handleLink}
        submitMessageHandler={submitMessageHandler}
        messageState={messageState}
      />
      <UserGuide 
        messageState={messageState}
      />
      { !isValidLink && <Blocker />}
      <Song 
        songName={songDetails?.name || songName}
        albumArt={songDetails?.album.images[0].url}
        hideShow={!loading}
        durationMs={songDetails?.duration_ms || '1:23'}
      />
      <OtherInformation
        artistName={songDetails?.artists[0].name || artistName}
        profilePicture={artistDetails?.images[0].url}
        hideShow={!loading}
        followers={artistDetails?.followers.total || 0}
        genres={artistDetails?.genres || []}
        topTracks={topTracks?.tracks || []}

      />
      <Footer />
    </>
  )
}

export default App
