export type Theme = 'blue' | 'red';

export const RANKS = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A1', 'A2', 'A3'
] as const;

export type Rank = typeof RANKS[number];

export interface TeamState {
  name: string;
  rankIndex: number;
}
