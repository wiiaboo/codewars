/*
    https://www.codewars.com/kata/5629db57620258aa9d000014
    (c) 2017 Ricardo Constantino <wiiaboo@gmail.com>
 */

function mix(s1, s2) {
    let s1Map = getLetters(s1);
    let s2Map = getLetters(s2);
    let common = filterCommon(s1Map, s2Map);

    let s1List = Object.keys(s1Map).map(x => "1:" + s1Map[x]);
    let s2List = Object.keys(s2Map).map(x => "2:" + s2Map[x]);
    let commonList = Object.keys(common).map(x => "=:" + common[x]);

    let all = s1List.concat(s2List.concat(commonList)).sort((a, b) => {
        return b.length - a.length == 0 ?
            a[0] < b[0] ? -1 :
            a[0] == b[0] ? a[2].localeCompare(b[2]) : 1 :
            b.length - a.length;
    });

    return all.join("/");
}

function getLetters(s) {
    let map = {};
    s.split('').filter(a => /[a-z]/.test(a)).sort((a, b) => a.localeCompare(b))
        .forEach(x => {
            if (map[x])
                map[x] += x;
            else
                map[x] = x;
        });

    for (const k in map)
        if (map[k].length < 2)
            delete map[k];

    return map;
}

function filterCommon(s1, s2) {
    let common = {};
    for (const k in s1) {
        if (s1[k] == s2[k]) {
            common[k] = s1[k];
            delete s1[k];
            delete s2[k];
        } else if (s2[k] && s1[k].length > s2[k].length) {
            delete s2[k];
        } else if (s2[k] && s1[k].length < s2[k].length) {
            delete s1[k];
        }
    }
    return common;
}