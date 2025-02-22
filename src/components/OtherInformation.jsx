import SongCard from "./SongCard.jsx"
import numberCondenser from "../numberCondenser.js";
import { useEffect, useState } from 'react'

export default function OtherInformation(props) {
    const allGenres = props.genres.join(', ');

        const [isPowered, setIsPowered] = useState(false)

    useEffect(() => {
        if (props.hideShow) {
            setTimeout(() => setIsPowered(true), 100)
        } else {
            setIsPowered(false)
        }
    }, [props.hideShow])

    return(
        <div className="main-card">
            <div className="main-card-top">
                <div className={"artist-container"}>
                    <div className={`tv-container ${isPowered ? 'tv-on' : 'tv-off'} ${props.hideShow ? '' : 'hidden-container'}`}>
                        <div className="tv-line"></div>
                        <div className={props.hideShow ? "artist-container" : "artist-container hidden-container"}>
                            {props.hideShow && <img 
                                className="artist-container-img tv-content"
                                src={props.profilePicture}
                            ></img>}
                        </div>
                    </div>
                </div>
                <div className="artist-title-info">
                    <h3>artist</h3>
                    <a href={props.artistLink} target="blank" rel="noopener noreferrer">
                        <h1 className={props.hideShow ? "show" : "hidden"}>{props.artistName}</h1>
                    </a>
                    <h2 className={props.hideShow ? "show" : "hidden"}>{allGenres}</h2>
                    <h3 className={props.hideShow ? "show" : "hidden"}>{`${numberCondenser(props.followers)} followers`}</h3>
                </div>
            </div>
            <div className="main-card-top-songs">
                <h1 className={props.hideShow ? "show" : "hidden"}>top songs</h1>

                {props.hideShow && props.topTracks.map((track, index) => (
                    <SongCard 
                        listNum={index + 1}
                        key={track.id}
                        title={track.name}
                        link={track.external_urls.spotify}
                        durationMs={track.duration_ms}
                        artists={track.artists}
                        albumArt={track.album.images[0].url}
                    />
                ))}
            </div>
        </div>
    )
}