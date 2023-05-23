/**
 * remove query params from link
 * @param link 
 * @returns link without query params
 */

export default function removeQuery(link: string) {
    if (link.includes("?")) {
        const newLink = link.split("?")
        link = newLink[0]
    }
    return link
}
