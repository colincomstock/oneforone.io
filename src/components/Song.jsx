import msToS from "../msToS"
import { useEffect, useState } from 'react'

export default function Song(props){
    const [isPowered, setIsPowered] = useState(false)

    useEffect(() => {
        if (props.hideShow) {
            setTimeout(() => setIsPowered(true), 100)
        } else {
            setIsPowered(false)
        }
    }, [props.hideShow])

    return(
        <div className="top-container">
            <div className="song">
                <div className={`tv-container ${isPowered ? 'tv-on' : 'tv-off'}`}>
                    <div className="tv-line"></div>
                    <div className={props.hideShow ? "song-album-art" : "song-album-art hidden-container"}>
                        {props.hideShow && <img className="tv-content" src={props.albumArt}/>}
                    </div>
                </div>
                <div className="song-title">
                        <h3>song title</h3>
                    <div className="title-time-horizontal">
                        <a href={props.songLink} target="blank" rel="noopener noreferrer">
                            <h1 className={props.hideShow ? "show" : "hidden"}>{props.songName}</h1>
                        </a>
                        <span className={props.hideShow ? "show" : "hidden"}>{msToS(props.durationMs)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}