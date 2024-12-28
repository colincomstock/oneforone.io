export default function Artist(props) {

    return(
        <div className="card">
            <div className={props.hideShow ? "artist-container" : "artist-container hidden-container"}>
                {props.hideShow && <img 
                    src={props.profilePicture}
                    width={"400px"}
                    height={"400px"}
                ></img>}
            </div>
            <h3>artist</h3>
            <h1 className={props.hideShow ? "show" : "hidden"}>{props.artistName}</h1>
        </div>
    )
}