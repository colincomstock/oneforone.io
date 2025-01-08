export default function UserGuide() {
    const welcomeMessage = "nice to meet you.\nthe last person who was here left a song for you to listen to. if you want to hear it, you'll have to leave something for the person who comes after you. try pasting a link to a song in the box above. ⬆️"
    const songPreviewMessage = "awesome,\nbelow is a preview of what the next person will get when they come here to exchange songs. we've taken the liberty of also grabbing some information about the artist, and some of their other top songs. if you're ready to leave this here for the next person, go ahead and click exchange."
    const exchangeMessage = "and there it is,\nbelow is the song that was left for you by the last user. just like what you left, we've also gathered some information for you about the artist, and some of their top songs. enjoy listening to the song that was left for you, and maybe check out some of their other work."
    
    return(
        <div className="user-guide">
            {welcomeMessage}
        </div>
    )
}