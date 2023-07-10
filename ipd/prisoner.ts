import { HISTORY_LEN, NICE_STEPS } from "./constants";
import { MovesTable } from "./moves-table";

export class Prisoner {
    private static newPrisonerId = 0;

    public moves = new MovesTable();
    public score = 0;
    public name: string;

    constructor(name?: string) {
        this.name = name || (Prisoner.newPrisonerId++).toString();
    }

    public play(moveHistory: string, matchesPlayed: number): boolean {
        debugger;
        const key = MovesTable.hashMove(moveHistory, matchesPlayed);
        // console.log(key, this.moves.getMove(key), moveHistory, matchesPlayed);
        return this.moves.getMove(key);
    }

    public getCoopLevel(): number {
        return this.moves.getCoopLevel();
    }

    public getCoopStep(): number {
        const coopLevel = this.getCoopLevel();
        return NICE_STEPS.find(step => coopLevel > step);
    }

    public clone(): Prisoner {
        const clone = new Prisoner(this.name + '-clone');
        clone.moves = this.moves.clone();
        clone.score = this.score;

        return clone;
    }

    public toString(): string {
        let str = '';
        for (let matchesPlayed = 0; matchesPlayed <= HISTORY_LEN; ++matchesPlayed) {
            const binMaxNum = Math.pow(2, matchesPlayed * 2);
            for (let i = 0; i < binMaxNum; ++i) {
                const key = MovesTable.hashMove(i.toString(2), matchesPlayed);
                str += this.moves.getMove(key) ? 'C' : 'D';
                // console.log(key, this.moves.getMove(key));
            }

            str += '; ';
        }
        str += this.getCoopLevel().toFixed(2);

        return str;
    }
}