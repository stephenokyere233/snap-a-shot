export default function linkifyUsernames(str: string) {
    const regex = /(@\S+)|(u\/\S+)/g;
    let outputStr = str.replace(regex, (match, username1, username2) => {
        let href = '';
        let username = username1 ? username1.slice(1) : username2.slice(2);
        if (match.startsWith('@')) {
            href = `https://twitter.com/${username}`;
            username = `@${username}`;
        } else {
            href = `https://www.showwcase.com/${username}`;
            username = `@${username}`;
        }
        return `<a href="${href}">${username}</a>`;
    });
    return outputStr.replace(/\n/g, '<br>');
}
