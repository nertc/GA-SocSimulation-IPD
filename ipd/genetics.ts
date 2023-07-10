import {
  CROSS_PROB,
  HISTORY_CHOICES_COUNT,
  HISTORY_LEN,
  MUTATE_PROB,
  PLAYER_MAX_MULT,
} from "./constants";
import { MovesTable } from "./moves-table";
import { Prisoner } from "./prisoner";

export class Genetics {
  public static crossover(
    prisoner1: Prisoner,
    prisoner2: Prisoner
  ): [Prisoner, Prisoner] {
    const child1 = new Prisoner();
    const child2 = new Prisoner();

    if (Math.random() > CROSS_PROB) {
      return [child1, child2];
    }

    const partSize = Math.floor(Math.random() * HISTORY_CHOICES_COUNT);
    let children = [child1, child2];
    for (
      let matchesPlayed = 0, matches = 0;
      matchesPlayed < HISTORY_LEN;
      ++matchesPlayed
    ) {
      const binMaxNum = Math.pow(2, matchesPlayed * 2);
      for (let history = 0; history < binMaxNum; ++history, ++matches) {
        if (matches === partSize) {
          children = [child2, child1];
        }
        const key = MovesTable.hashMove(history.toString(2), binMaxNum);
        children[0].moves.setMove(key, prisoner1.moves.getMove(key));
        children[1].moves.setMove(key, prisoner2.moves.getMove(key));
      }
    }

    return [child1, child2];
  }

  public static mutate(prisoner: Prisoner): Prisoner {
    for (
      let matchesPlayed = 0;
      matchesPlayed < HISTORY_LEN;
      ++matchesPlayed
    ) {
      const binMaxNum = Math.pow(2, matchesPlayed * 2);
      for (let history = 0; history < binMaxNum; ++history) {
        if (Math.random() > MUTATE_PROB) {
          continue;
        }
        const key = MovesTable.hashMove(history.toString(2), binMaxNum);
        prisoner.moves.setMove(key, !prisoner.moves.getMove(key));
      }
    }

    return prisoner;
  }

  public static scale(prisoners: Prisoner[]): number[] {
    const min = prisoners.reduce((min, prisoner) => Math.min(min, prisoner.score), prisoners[0].score);
    const max = prisoners.reduce((max, prisoner) => Math.max(max, prisoner.score), prisoners[0].score);
    const total = prisoners.reduce((total, prisoner) => total + prisoner.score, 0);
    const avg = total / prisoners.length;

    const nonnegative = min > (PLAYER_MAX_MULT * avg - max) / (PLAYER_MAX_MULT - 1);
    const delta = nonnegative ? max - avg : avg - min;
    const a = nonnegative ? (PLAYER_MAX_MULT - 1) * avg / delta : avg / delta;
    const b = nonnegative ? avg * (max - PLAYER_MAX_MULT * avg) / delta : -min * avg / delta;

    return prisoners.map(prisoner => a * prisoner.score + b);
  }

  private static lastSelectedPrisoner: Prisoner;
  public static selection(prisoners: Prisoner[]): Prisoner {
    const scores = this.scale(prisoners);
    const scoreSum = scores.reduce((total, score) => total + score, 0);
    let targetScore = Math.random() * scoreSum;
    let prisonerIndex = Math.floor(Math.random() * scores.length);

    while (targetScore > 0) {
      if (++prisonerIndex >= scores.length) {
        prisonerIndex = 0;
      }

      if (prisoners[prisonerIndex] === this.lastSelectedPrisoner) {
        continue;
      }

      targetScore -= scores[prisonerIndex];
    }

    this.lastSelectedPrisoner = prisoners[prisonerIndex];
    return this.lastSelectedPrisoner;
  }

  public static breed(prisoners: Prisoner[]): Prisoner[] {
    const children: Prisoner[] = [];

    while (children.length < prisoners.length) {
      const prisoner1 = this.selection(prisoners);
      const prisoner2 = this.selection(prisoners);

      const newPrisoners = this.crossover(prisoner1, prisoner2).map(childPrisoner => this.mutate(childPrisoner));
      children.push(newPrisoners[0]);
      if (children.length < prisoners.length) {
        children.push(newPrisoners[1]);
      }
    }

    return children;
  }
}
