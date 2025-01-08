export default function Song(props){

    return(
        <div className="top-container">
            <div className="song">
                <div className={props.hideShow ? "song-album-art" : "song-album-art hidden-container"}>
                    {props.hideShow && <img src={props.albumArt}/>}
                </div>
                <div className="song-title">
                    <h3>song title</h3>
                    <h1 className={props.hideShow ? "show" : "hidden"}>{props.songName}</h1>
                </div>
            </div>
        </div>
    )
}