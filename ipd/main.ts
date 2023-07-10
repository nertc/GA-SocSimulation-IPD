import { NICE_STEPS, PLAYERS } from "./constants";
import { playGame } from "./play-game";
import { Prisoner } from "./prisoner";

const game = playGame(new Array(PLAYERS).fill(undefined).map(() => new Prisoner()));

(async function () {
    let gen = 0;
    let gameState = await game.next();
    while (!gameState.done) {
        console.log(gen, (gameState.value as Prisoner[]).reduce((acc, prisoner) => {
            const coopStep = prisoner.getCoopStep();
            if (!acc[coopStep]) {
                acc[coopStep] = 0;
            }
            acc[coopStep]++;
            return acc;
        }, {} as any))
        gameState = await game.next();
        ++gen;
    }
})()