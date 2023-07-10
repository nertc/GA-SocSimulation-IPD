export const HISTORY_LEN = 3; // Matches count saved in memory
export const HISTORY_BIN_MAX_NUM = Math.pow(2, HISTORY_LEN * 2); // Matches binary representation maximum
export const HISTORY_BIN_R_LEN = (HISTORY_BIN_MAX_NUM - 1).toString(2).length; // Matches binary representation length
export const HISTORY_CHOICES_COUNT = new Array(HISTORY_LEN).reduce(
    (acc, _, index) => acc + Math.pow(2, (index + 1) * 2),
    0
);

export const ITERATIONS = 100; // IPD Iterations per generation
export const ONLY_DEF_POINT = 5; // Point of only defector
export const ONLY_COOP_POINT = 0; // Point of only cooperator
export const BOTH_DEF_POINT = 1; // Point of both defector
export const BOTH_COOP_POINT = 3; // Point of both cooperator
export const MUTATE_PROB = 0.005; // Probability of mutation
export const CROSS_PROB = 0.8; // Probability of crossover
export const GENERATIONS = 1000; // Generations of players
export const PLAYERS = 25; // Players per generation
export const PLAYER_MAX_MULT = 2; // Maximum number player can create a child
export const INIT_DEF_PROB = 0.5;
export const NICE_STEPS = [0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0];
