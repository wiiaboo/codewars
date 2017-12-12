/*
    https://www.codewars.com/kata/51b62bf6a9c58071c600001b
    (c) 2017 Ricardo Constantino <wiiaboo@gmail.com>
 */

import java.util.LinkedHashMap;
import java.util.Map;

public class Conversion {

    public String solution(int value) {
        Map<Integer, String> map = new LinkedHashMap<>();
        map.put(1000,"M");
        map.put(900, "CM");
        map.put(500, "D");
        map.put(400, "CD");
        map.put(100, "C");
        map.put(90,  "XC");
        map.put(50,  "L");
        map.put(40,  "XL");
        map.put(10,  "X");
        map.put(9,   "IX");
        map.put(5,   "V");
        map.put(4,   "IV");
        map.put(1,   "I");

        StringBuilder res = new StringBuilder();

        for (int num : map.keySet()) {
            while (num <= value) {
                res.append(map.get(num));
                value -= num;
            }
        }

        return res.toString();
    }
}