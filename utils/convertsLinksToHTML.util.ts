/**
 * 
 * @param text 
 * @returns text with all possible links turned to actual links
 */

export default function convertLinksToHTML(text: any) {
    const linkRegex = /(https?:\/\/\S+)|(www\.\S+)/gi;
    const replacedText = text.replace(linkRegex, (match: any) => {
        let href = match;
        if (match.startsWith("www")) {
            href = `http://${match}`;
        }
        return `<a href="${href}" target="_blank">${match}</a>`;
    });
    return replacedText;
}