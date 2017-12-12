/*
    https://www.codewars.com/kata/5550d638a99ddb113e0000a2
    (c) 2017 Ricardo Constantino <wiiaboo@gmail.com>
 */

import java.util.List;
import java.util.Iterator;
import java.util.LinkedList;

public class Josephus {
    public static <T> List<T> josephusPermutation(final List<T> items, final int k) {

        LinkedList<T> list = new LinkedList<>();

        if (items.size() == 0) {
            return list;
        }
        if (items.size() == 1) {
            list.add(items.get(0));
            return list;
        }

        int size = items.size();

        int i = 0;
        Iterator<T> it = items.iterator();
        while (list.size() < size) {
            while (++i < k) {
                if (!it.hasNext()) {
                    it = items.iterator();
                }
                it.next();
            }
            if (!it.hasNext()) {
                it = items.iterator();
            }
            T tokill = it.next();
            list.add(tokill);
            it.remove();
            i = 0;
        }
        return list;
    }
}