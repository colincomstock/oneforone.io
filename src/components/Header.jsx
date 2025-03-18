import logo from '../assets/temp_logo.png'
import React from 'react'

export default function Header(props){
    const [link, setLink] = React.useState('')
    const [fetchedData, setFetchedData] = React.useState(null);
    
    async function fetchData() {
        try {
            const response = await fetch('https://oneforone-basic-auth.comstockcolin.workers.dev/songLink');
            const data = await response.json();
            console.log("fetched data: ", data);
            setFetchedData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function writeToDatabase(songLink) {
        try {
            await fetch('https://oneforone-basic-auth.comstockcolin.workers.dev/songLink', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({songLink}),
            });
        } catch (error) {
            console.error("Error writing to database: ", error);
            throw error;
        }
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        if (props.hideShow) {
            try{
                await fetchData();
                await writeToDatabase(link);
                props.submitMessageHandler();
            } catch (error) {
                console.error("Failed to handle submission: ", error);
            }
        }
    }

    function handleChange(event) {
        const {value} = event.currentTarget;
        setLink(value);
        props.onLinkChange(value);
    }

    React.useEffect(() => {
        if(fetchedData){
            props.onLinkChange(fetchedData?.songLink);
        }
    }, [fetchedData])
    
    return(
        <header>
            <img src={logo} />
            <h1>oneforone.io</h1>
            <form style={{display: props.messageState === 'onSubmit' ? 'none' : 'flex'}} className="add-song-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="insert spotify song link ..."
                    aria-label="add spotify song reccomendation"
                    name="spotifyLink"
                    onChange={handleChange}
                    value={link}
                />
                <button type="submit">exchange 🔄</button>

            </form>
        </header>
    )
}