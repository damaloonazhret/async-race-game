export function getCarIdFromURL(url: string): number | null {
    const regex = /id=(\d+)/;
    const match = url.match(regex);

    if (match && match[1]) {
        return parseInt(match[1], 10);
    }

    return null;
}
