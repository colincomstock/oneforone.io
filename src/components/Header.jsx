export default function Header(){
    return(
        <header>
            <h1>song exchange</h1>
            <form className="add-song-form">
                <input
                    type="text"
                    placeholder="insert spotify song link ..."
                    aria-label="add spotify song reccomendation"
                    name="spotifyLink"
                />
                <button>exchange</button>
            </form>
        </header>
    )
}