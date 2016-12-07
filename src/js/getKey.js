const map = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "\b"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\n"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    [" "]
];

export default function getKey({x, y} = {}) {
    if(typeof x !== "number" || typeof y !== "number") {
        throw new Error("getKey must input number");
    }

    const row = y * 5 | 0;
    let col = null;

    switch(row) {
        case 0:
            col = (x > 790 / 885) ? 13 : (x * 885 / 61 | 0);
            break;
        
        case 1:
            col = x > 817 / 885 ? 12 : ((x * 885 - 102) / 59 | 0);
            break;
        
        case 2:
            col = x > 769 / 885 ? 11 : ((x * 885 - 118) / 59 | 0);
            break;

        case 3:
            col = x > 738 / 885 ? 10 : ((x * 885 - 144) / 59 | 0);
            break;
        
        case 4:
            col = (x > 250 / 885 && x < 593 / 885) ? 0 : 1;
    }

    let ret;
    try {
        ret = map[row][col] || "";
    } catch(e) {
        ret = "";
    }
    return ret;
}