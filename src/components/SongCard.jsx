import spotifyLogo from '../assets/spotify_logo.png'
import msToS from '../msToS'

export default function SongCard(props) {
    const allArtists = props.artists.map((artist) => {
        return artist.name
    })
    const allArtistsFormatted = allArtists.join(', ')
    
    return(
        <div className="song-card">
            <span>{props.listNum}</span>
            <img src={props.albumArt}  width="75px" height="75px"/>
            <div className="song-card-title">
                <h2>{props.title}</h2>
                <span>{allArtistsFormatted}</span>
            </div>
            <div className="song-card-duration">
                <span>{msToS(props.durationMs)}</span>
            </div>
            <div className='listen-on'>
                <span>listen on</span>
                <img src={spotifyLogo} width="25px" height="25px" />
            </div>

        </div>
    )
}