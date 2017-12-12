/*
    https://www.codewars.com/kata/5659c6d896bc135c4c00021e
    (c) 2017 Ricardo Constantino <wiiaboo@gmail.com>
 */

function nextSmaller(n) {

    let s = n.toString().split('');
    if (n < 10 || s[0] == '0')
        return -1;

    let switchWithNextLower = function(idx) {
        let thisNum = s[idx];

        let lower = parseInt(thisNum) - 1;
        let lowerIdx = s.indexOf(lower.toString(), idx + 1);

        while (lowerIdx == -1 && lower >= 0) {
            lower--;
            lowerIdx = s.indexOf(lower.toString(), idx + 1);
        }
        if (lowerIdx == -1)
            return false;

        s[lowerIdx] = thisNum;
        s[idx] = lower;
        let unsorted = s.slice(0, idx + 1);
        let rest = s.slice(idx + 1).sort((a, b) => {
            if (a == '0')
                return 1;
            if (b == '0')
                return -1;
            return b - a;
        });
        s = unsorted.concat(rest);
    }

    for (let i = s.length - 2; i >= 0; i--) {
        if (s[i] > s[i + 1]) {
            switchWithNextLower(i);
        }
        if (parseInt(s.join('')) < n)
            break;
    }

    if (s[0] == 0 || parseInt(s.join('')) === n)
        return -1;

    return parseInt(s.join(''));
}