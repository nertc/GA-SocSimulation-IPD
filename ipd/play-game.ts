import { GENERATIONS } from "./constants";
import { Genetics } from "./genetics";
import { playTournament } from "./play-tournament";
import { Prisoner } from "./prisoner";

export async function* playGame(prisoners: Prisoner[]): AsyncGenerator<Prisoner[], void, void> {
    let scorePrisoners = await playTournament(prisoners);
    yield scorePrisoners;
    for (let gen = 0; gen < GENERATIONS; ++gen) {
        const newPrisoners = Genetics.breed(scorePrisoners);
        scorePrisoners = await playTournament(newPrisoners);
        yield scorePrisoners;
    }
}