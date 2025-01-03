export default function ArtistDescription(props) {
    return(
        <div className="card">
            <div className={props.hideShow ? "about-artist-container" : "about-artist-container hidden-container"}>
                {props.hideShow && (
                    <>
                        <div>
                            <h1>test</h1>
                            <h1>followers</h1>
                        </div>
                        <div>
                            <h1>test</h1>
                            <h1>genres</h1>
                        </div>
                        <div>
                            <h1>test</h1>
                            <h1>popularity</h1>
                        </div>
                    </>
                )}
            </div>

        <h3>about artist</h3>
    </div>
    )
}