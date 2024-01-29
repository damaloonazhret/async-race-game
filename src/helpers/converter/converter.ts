export function convertRGBtoHex(rgb: string) {
    const matches = rgb.match(/\d+/g);
    const red = matches ? parseInt(matches[0]) : 0;
    const green = matches ? parseInt(matches[1]) : 0;
    const blue = matches ? parseInt(matches[2]) : 0;

    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');

    return `#${redHex}${greenHex}${blueHex}`;
}
