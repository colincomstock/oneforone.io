import logo from '../assets/temp_logo.png'
import React from 'react'

export default function Header(props){
    const [link, setLink] = React.useState('')
    
    function handleChange(event) {
        const {value} = event.currentTarget;
        setLink(value);
        props.onLinkChange(value)
    }
    
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
                    onChange={handleChange}
                    value={link}
                />
                <button>exchange</button>

            </form>
        </header>
    )
}