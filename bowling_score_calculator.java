/*
    https://www.codewars.com/kata/5531abe4855bcc8d1f00004c
    (c) 2017 Ricardo Constantino <wiiaboo@gmail.com>
 */

import java.util.ArrayList;

public class Solution {
    public static int bowling_score(String frames) {
        System.out.println(frames);
        String[] rounds = frames.split(" ");
        ArrayList<Integer> roundsScore = new ArrayList<>();

        for (int i = 0; i < rounds.length - 1; i++) {
            char[] frame = rounds[i].toCharArray();
            for (char roll : frame) {
                switch (roll) {
                    case 'X':
                        roundsScore.add(10);
                        break;
                    case '/':
                        roundsScore.add(roundsScore.get(roundsScore.size() - 1) - 10);
                        break;
                    default:
                        roundsScore.add(Character.digit(roll, 10));
                }
            }
        }

        char[] lastFrame = rounds[rounds.length - 1].toCharArray();
        int lastFrameRolls = lastFrame.length;
        int lastRoll = 0;
        for (char roll : lastFrame) {
            int rollScore = 0;
            switch (roll) {
                case 'X':
                    rollScore += 10;
                    lastRoll = 0;
                    break;
                case '/':
                    rollScore += lastRoll - 10;
                    lastRoll = 0;
                    break;
                default:
                    rollScore += Character.digit(roll, 10);
                    lastRoll = Character.digit(roll, 10);
            }
            roundsScore.add(rollScore);
        }
        
        int score = 0;

        for (int i = 0; i < roundsScore.size() - lastFrameRolls; i++) {
            int thisRoll = roundsScore.get(i);
            if (thisRoll == 10) {
                int firstRollAfter = roundsScore.get(i + 1);
                thisRoll += firstRollAfter;
                int secondRollAfter = roundsScore.get(i + 2);
                secondRollAfter = secondRollAfter >= 0 ? secondRollAfter : calcSpare(firstRollAfter, 0);
                thisRoll += secondRollAfter;
            } else if (thisRoll < 0) {
                thisRoll = calcSpare(roundsScore.get(i - 1), roundsScore.get(i + 1));
            }
            score += thisRoll;
        }

        for (int i = roundsScore.size() - lastFrameRolls; i < roundsScore.size(); i++) {
            int thisRoll = roundsScore.get(i);
            if (thisRoll < 0) {
                thisRoll = calcSpare(roundsScore.get(i - 1), 0);
            }
            score += thisRoll;
        }
        return score;
    }

    private static int calcSpare(int before, int after) {
        return (10 - before) + after;
    }
}