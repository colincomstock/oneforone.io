# oneforone.io

A music discovery web app where you exchange songs with strangers around the world.

[**Live Demo →**](https://oneforone.io)

## The Idea

I wanted to create something that connects people through music in a simple but meaningful way. The concept is straightforward: someone before you left a song, but you can only hear it if you leave a song for the next person.

It's like a musical pay-it-forward chain that spans the globe.

## How It Works

1. **Paste a Spotify link** - Share a song you think someone else should hear
2. **Preview your choice** - See exactly what the next person will experience  
3. **Hit exchange** - Your song gets stored and you unlock what was left for you
4. **Discover** - Listen to your new song and explore the artist's other work

## What I Built

### Frontend Experience
The interface centers around a retro TV aesthetic that I thought would be fun and nostalgic. When you exchange songs, the album art "powers on" like an old CRT television - complete with static, scan lines, and that classic bright flash.

The text guidance changes dynamically as you move through the experience, typing out character by character to feel more conversational and less like typical web instructions.

### Technical Architecture  
Rather than expose my Spotify API keys to the frontend, I built a Cloudflare Worker that handles all the authentication and API calls. It fetches track info, artist details, and top songs in one request, then sends everything back to the React app.

For persistence, I'm using Cloudflare KV storage to keep track of the current song in the exchange chain. It's simple but reliable for this use case.

### UI Details I'm Proud Of
- **TV animation system** - Custom CSS animations that simulate powering on an old television
- **Responsive design** - Works smoothly from phone to desktop
- **Loading states** - The static effect shows while data loads, then smoothly transitions to content
- **URL validation** - Parses Spotify links in real-time and gives immediate feedback

## Tech Stack

**Frontend:** React 18, Vite, CSS3  
**Backend:** Cloudflare Workers  
**Storage:** Cloudflare KV  
**API:** Spotify Web API  
**Deployment:** Cloudflare Pages  

## The Development Process

This started as an experiment with the Spotify API and evolved into a full interactive experience. I wanted to challenge myself to:

- Build something people would actually want to use
- Learn Cloudflare's serverless platform 
- Create smooth animations and transitions
- Handle real-world API integration and error states

The TV aesthetic came later when I realized the app needed more personality. The retro feel seemed to match the nostalgic act of sharing music recommendations.

## Key Features

**Music Integration**
- Real-time Spotify data (tracks, artists, albums)
- Artist deep-dives with genres and follower counts
- Top tracks discovery
- Direct links to listen on Spotify

**Visual Experience**
- Custom TV power-on animations
- Typewriter text effects
- Mobile-responsive design
- Loading states with visual feedback

**Architecture**
- Serverless API proxy for security
- Global CDN distribution
- Real-time link validation
- Error handling and fallbacks

---

*This is a portfolio project demonstrating React development, API integration, serverless architecture, and creative UI design.*
