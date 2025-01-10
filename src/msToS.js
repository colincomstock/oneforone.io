export default function msToS(timeInMs) {
    const timeInS = Math.floor(timeInMs / 1000);
    const seconds = timeInS % 60;
    const minutes = Math.floor(timeInS / 60);
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedTime
}