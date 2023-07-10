import { playTwoPlayerIPD } from "./play-two-player-ipd";
import { Prisoner } from "./prisoner";

export async function playTournament(
  prisoners: Prisoner[]
): Promise<Prisoner[]> {
  const evalPrisoners = await Promise.all(
    prisoners.map(
      (prisoner) =>
        new Promise<Prisoner>((res) => {
          const evalPrisoner = prisoner.clone();
          evalPrisoner.score = 0;
          prisoners.forEach((enemyPrisoner) =>
            playTwoPlayerIPD(evalPrisoner, enemyPrisoner)
          );
          res(evalPrisoner);
        })
    )
  );

  return evalPrisoners;
}
