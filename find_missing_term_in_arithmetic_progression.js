/*
    https://www.codewars.com/kata/5672682212c8ecf83e000050
    (c) 2017 Ricardo Constantino <wiiaboo@gmail.com>
 */

var findMissing = function(list) {
    let lowestDif = list.reduceRight((p, c, i, a) => {
        let curDif = a[i + 1] - c;
        return Math.abs(curDif) < Math.abs(p) ? curDif : p;
    }, list[1] - list[0]);

    let missingNum = list[0] - lowestDif;
    list.every(v => v == (missingNum += lowestDif));

    return missingNum;
}