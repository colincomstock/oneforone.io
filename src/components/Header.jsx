import logo from '../assets/temp_logo.png'

export default function Header(props){
    return(
        <header>
            <img src={logo} />
            <h1>oneforone.io</h1>
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