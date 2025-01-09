import StreamedText from "./StreamedText"
import React from 'react'


export default function UserGuide({ messageState }) {
    const welcomeMessage = "nice to meet you.\nthe last person who was here left a song for you to listen to. if you want to hear it, you'll have to leave something for the person who comes after you. try pasting a link to a song in the box above. ⬆️"
    const songPreviewMessage = "awesome,\nbelow is a preview of what the next person will get when they come here to exchange songs. we've also grabbed some information about the artist, and some of their other top songs. when you're ready to leave this here for the next person, go ahead and click exchange."
    const exchangeMessage = "and there it is,\nbelow is the song that was left for you by the last user. just like what you left, we've also gathered some information for you about the artist, and some of their top songs. enjoy listening to the song that was left for you, and maybe check out some of their other work. you're welcome to come back here whenever you want and exchange again."

    const [currentMessage, setCurrentMessage] = React.useState('')

    console.log(messageState)
    React.useEffect(() => {
        console.log("useeffect fired")
        if (messageState === "onEnter") {
            setCurrentMessage(welcomeMessage)
            console.log(currentMessage)
        } else if (messageState === "onPreview") {
            setCurrentMessage(songPreviewMessage)
        } else if (messageState === "onSubmit") {
            setCurrentMessage(exchangeMessage);
        }
    }, [messageState])

    return(
        <div className="user-guide">            
            <StreamedText 
                text={currentMessage}
                speed={25}
            />
        </div>
    )
}