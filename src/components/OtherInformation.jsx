import SongCard from "./SongCard.jsx"

export default function OtherInformation(props) {
    const allGenres = props.genres.join(', ');
    return(
        <div className="main-card">
            <div className="main-card-top">
                <div className={props.hideShow ? "artist-container" : "artist-container hidden-container"}>
                    {props.hideShow && <img 
                        src={props.profilePicture}
                    ></img>}
                </div>
                <div className="artist-title-info">
                    <h3>artist</h3>
                    <h1 className={props.hideShow ? "show" : "hidden"}>{props.artistName}</h1>
                    <h2 className={props.hideShow ? "show" : "hidden"}>{allGenres}</h2>
                    <h3 className={props.hideShow ? "show" : "hidden"}>{`${props.followers} followers`}</h3>
                </div>
            </div>
            <div className="main-card-top-songs">
                <h1>top songs</h1>

                {props.topTracks.map((track, index) => (
                    <SongCard 
                        listNum={index + 1}
                        key={track.id}
                        title={track.name}
                        durationMs={track.duration_ms}
                        artists={track.artists}
                        albumArt={track.album.images[0].url}

                    />
                ))}
            </div>
        </div>
    )
}