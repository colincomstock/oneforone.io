import React, { useEffect, useRef } from 'react';
import lock from '../assets/padlock-closed.png'


export default function Blocker() {
    const blockerRef = useRef(null);

    useEffect(() => {
        const userGuide = document.getElementById('user-guide');
        if (userGuide) {
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    if (blockerRef.current) {
                        const rect = entry.target.getBoundingClientRect();
                        blockerRef.current.style.top = `${rect.bottom}px`;
                    }
                }
            });

            resizeObserver.observe(userGuide);
            
            return () => {
                resizeObserver.unobserve(userGuide);
            };
        }
    }, []);

    return (
        <div ref={blockerRef} id="blocker" className="blocker">
                <img className="floating" src={lock} />
                <span>paste a valid link above to continue</span>
        </div>
    );
};