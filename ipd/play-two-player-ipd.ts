import { BOTH_COOP_POINT, BOTH_DEF_POINT, HISTORY_LEN, ITERATIONS, ONLY_COOP_POINT, ONLY_DEF_POINT } from "./constants";
import { Prisoner } from "./prisoner";

const movesResult = {
    true: { // Self coop
        true: BOTH_COOP_POINT, // Enemy coop
        false: ONLY_COOP_POINT // Enemy def
    },
    false: { // Self def
        true: ONLY_DEF_POINT, // Enemy coop
        false: BOTH_DEF_POINT // Enemy def
    }
};

const movesToHistory = {
    true: { // Self coop
        true: '11', // Enemy coop
        false: '10' // Enemy def
    },
    false: { // Self def
        true: '01', // Enemy coop
        false: '00' // Enemy def
    }
};

export function playTwoPlayerIPD(prisoner1: Prisoner, prisoner2: Prisoner): [Prisoner, Prisoner] {
    let prisoner1History = '';
    let prisoner2History = '';
    for (let iteration = 0; iteration < ITERATIONS; ++iteration) {
        const prisoner1Move = String(prisoner1.play(prisoner1History, Math.min(iteration, HISTORY_LEN))) as 'true' | 'false';
        const prisoner2Move = String(prisoner2.play(prisoner2History, Math.min(iteration, HISTORY_LEN))) as 'true' | 'false';

        // console.log(movesResult, prisoner1Move, prisoner2Move);
        const prisoner1Score = movesResult[prisoner1Move][prisoner2Move];
        const prisoner2Score = movesResult[prisoner2Move][prisoner1Move];

        prisoner1.score += prisoner1Score;
        prisoner2.score += prisoner2Score;

        prisoner1History += movesToHistory[prisoner1Move][prisoner2Move];
        prisoner2History += movesToHistory[prisoner2Move][prisoner1Move];
    }

    return [prisoner1, prisoner2];
}