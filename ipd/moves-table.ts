import { HISTORY_BIN_R_LEN, HISTORY_LEN, INIT_DEF_PROB } from "./constants";

export class MovesTable {
    private moves: Record<number, boolean> = {};

    constructor() {
        this.setMove(MovesTable.hashMove('', 0), Math.random() > INIT_DEF_PROB);
        for (let matchesPlayed = 0; matchesPlayed <= HISTORY_LEN; ++matchesPlayed) {
            const binMaxNum = Math.pow(2, matchesPlayed * 2);
            for (let i = 0; i < binMaxNum; ++i) {
                const key = MovesTable.hashMove(i.toString(2), matchesPlayed);
                this.setMove(key, Math.random() > INIT_DEF_PROB);
            }
        }
    }

    public setMove(moveId: number, value: boolean): void {
        this.moves[moveId] = value;
    }

    public getMove(moveId: number): boolean {
        // console.log(this.moves);
        return this.moves[moveId];
    }

    public getCoopLevel(): number {
        const keys = Object.keys(this.moves).map(moveId => Number(moveId));
        return keys.filter(key => this.moves[key]).length / keys.length;
    }

    public clone(): MovesTable {
        const clone = new MovesTable();
        Object.keys(this.moves).map(moveId => Number(moveId)).forEach(moveId => clone.setMove(moveId, this.moves[moveId]));
        return clone;
    }

    public static hashMove(moveHistory: string, matchesPlayed: number): number {
        if (moveHistory.length > HISTORY_BIN_R_LEN) {
            moveHistory = moveHistory.slice(moveHistory.length - HISTORY_BIN_R_LEN);
        }
        const rKey = new Array(HISTORY_BIN_R_LEN - moveHistory.length).fill('0').join('') + moveHistory;
        const lKey = matchesPlayed.toString(2);
        const key = parseInt(lKey + rKey, 2);
        return key;
    }
}