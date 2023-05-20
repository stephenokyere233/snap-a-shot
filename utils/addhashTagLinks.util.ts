/**
 * 
 * @param text 
 * @returns 
 */

export default function addHashtagLinks(text:string) {
    const words = text.split(' ');
    const hashtagRegex = /#(\w+)/g;

    const result = words.map((word) => {
        if (word.match(hashtagRegex)) {
            const hashtag = word.replace('#', '');
            return `<a href="#">#${hashtag}</a>`;
        }
        return word;
    });

    return result.join(' ');
}