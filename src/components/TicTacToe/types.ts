type Square = 'X' | 'O';

export type SquareValue = Square | null;

export type WinnerValue = SquareValue | 'DRAW';

export interface SquareProps {
  onClick(): void;
  value: SquareValue;
}

export interface BoardProps {
  onClick(i: number): void;
  board: SquareValue[];
}

export interface ScoreboardProps {
  isLoading: boolean;
  xWins: number;
  oWins: number;
  draws: number;
}

export interface InitGame {
  board: SquareValue[];
  player: SquareValue;
  totalTurns: number;
  winner?: WinnerValue;
}
