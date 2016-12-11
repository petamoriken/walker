export default function fisherYates() {
    let n = this.length;

    const ret = this.concat();

    while(n) {
        const i = (Math.random() * n--) | 0;
        [ ret[n], ret[i] ] = [ ret[i], ret[n] ];
    }

    return ret;
}