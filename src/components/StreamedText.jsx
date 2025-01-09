import React, { useEffect } from 'react'

export default function StreamedText({ text, speed }) {
    const [displayedText, setDisplayedText] = React.useState([]);
    const [charIndex, setCharIndex] = React.useState(0);

    useEffect(() => {
        setDisplayedText([]);
        setCharIndex(0);
    }, [text])


    React.useEffect(() => {
        const timer = setTimeout(() => {
            const nextChar = text[charIndex];
            if (nextChar === '\n') {
                setDisplayedText(prev => [...prev, <br key={charIndex} />]);
            } else {
                setDisplayedText(prev => [...prev, nextChar]);
            }
            setCharIndex(charIndex + 1);
        }, speed);

        return () => clearTimeout(timer);
    }, [charIndex, text, speed]);

    return (
        <div className="typing-text">
            {displayedText}
            <span className='cursor'>|</span>
        </div>
    );
};