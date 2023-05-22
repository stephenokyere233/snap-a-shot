/**
 * Removes the last URL( the url of the tweet) from the tweet
 * @param text 
 * @returns the tweet wit the last link removed
 */
export default function removeLastURL(text: string) {
    const items = text.split(' ');
    const urlRegex = /(https?:\/\/t\.co\/\w+)/;

    for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].match(urlRegex)) {
            items.splice(i, 1);
            break;
        }
    }

    return items.join(' ');
}
