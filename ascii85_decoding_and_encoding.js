/*
    https://www.codewars.com/kata/5277dc3ff4bfbd9a36000c1c
    (c) 2017 Ricardo Constantino <wiiaboo@gmail.com>
 */

String.prototype.toAscii85 = function() {
    const ascii85start = '<~';
    const ascii85end = '~>';

    if (!this || this == '')
        return ascii85start + ascii85end;

    let pad = 0;
    // encode this string as ASCII85

    let ascii85 = this
        .match(/(\n|\r|.){1,4}/g)
        .map(s => {
            if (s.length != 4)
                pad += 4 - s.length;
            return s
        })
        .map(s => s.split('').map(v => {
                let x = v.charCodeAt(0);
                return x;
            })
            .reduce((c, v, i) => c + (v << (8 * (3 - i)) >>> 0), 0))
        .map(c => {
            let chars = [];
            for (let i = 0; i < 5; i++) {
                let rem = c % 85;
                chars.unshift(String.fromCharCode(rem + 33));
                c = (c - rem) / 85;
            }
            return chars.join('');
        });

    if (pad > 0)
        ascii85[ascii85.length - 1] = ascii85[ascii85.length - 1].slice(0, -pad);

    return ascii85start + ascii85.map(c => c == '!!!!!' ? 'z' : c).join('') + ascii85end;
}

String.prototype.fromAscii85 = function() {
    // decode this string from ASCII85

    const ascii85start = '<~';
    const ascii85end = '~>';
    let ascii85 = !this ? this : this.replace(/(^<~|~>$|\s)/g, '');

    if (!ascii85)
        return '';

    let pad = 0;
    let decoded = ascii85
        .match(/(z|.{1,5})/gu)
        .map(s => {
            if (s == 'z')
                return '!!!!!';
            if (s.length != 5) {
                pad += 5 - s.length;
                return s + 'u'.repeat(pad);
            }
            return s
        })
        .map(s => s.split('')
            .map(v => {
                let c = v.charCodeAt(0) - 33;
                return c;
            })
            .reduce((c, v, i) => c + (v * (Math.pow(85, (4 - i)) >>> 0)), 0))
        .map(c => {
            let chars = [];
            for (let i = 0; i < 4; i++) {
                let rem = c % Math.pow(2, 8);
                chars.unshift(String.fromCharCode(rem));
                c = (c - rem) / Math.pow(2, 8);
            }

            let joined = chars.join('');
            return joined;
        }).join('');
    return (pad > 0 ? decoded.slice(0, -pad) : decoded);
}