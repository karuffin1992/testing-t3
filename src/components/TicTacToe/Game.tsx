import { useState } from 'react';
import type { SquareValue, WinnerValue, InitGame } from './types';
import Board from './Board';
import { trpc } from '../../utils/trpc';
import Scoreboard from './Scoreboard';

const initGame: InitGame = {
  board: Array(9).fill(null),
  player: 'X',
  totalTurns: 1,
  winner: undefined,
};

const Game: React.FC = () => {
  const {
    data: allWinnersData,
    isLoading: loadingAllWinners,
    refetch: refetchWinners,
  } = trpc.ticTacToe.getAllWinners.useQuery();
  const addWinnerMutation = trpc.ticTacToe.addWinner.useMutation();

  const [board, setBoard] = useState<SquareValue[]>(initGame.board);
  const [currentPlayer, setCurrentPlayer] = useState<SquareValue>(initGame.player);
  const [totalTurns, setTotalTurns] = useState<number>(initGame.totalTurns);
  const [winner, setWinner] = useState<WinnerValue | undefined>(initGame.winner);
  const turnMax = 9;

  function handleClick(rowIndex: number) {
    // copy the board so we don't mutate state directly
    const newBoard = board.slice();

    if (winner) {
      return;
    }

    if (!newBoard[rowIndex]) {
      newBoard[rowIndex] = currentPlayer;

      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      setTotalTurns(totalTurns + 1);

      const calcWinner = getWinner(newBoard);

      if (calcWinner) {
        setWinner(calcWinner);
        addWinnerMutation.mutate(
          { winner: calcWinner },
          {
            onSuccess: () => {
              refetchWinners();
            },
          }
        );
      }
    }
  }

  function getWinner(currentBoard: SquareValue[]): WinnerValue {
    if (totalTurns === turnMax) {
      return 'DRAW';
    }

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
    ];

    let winningCombosIndex = 0;
    let calcWinner: WinnerValue = null;

    while (winningCombosIndex < winningCombos.length && !winner) {
      const boardPositionsToCheck = winningCombos[winningCombosIndex];
      const boardValuesToCkeck = boardPositionsToCheck
        ? boardPositionsToCheck.map((index) => currentBoard[index])
        : [null, null, null];
      let checkingValue = boardValuesToCkeck[0];
      const isFinished = boardValuesToCkeck.every(
        (value) => value === checkingValue && checkingValue
      );

      checkingValue = !checkingValue ? null : checkingValue;
      calcWinner = !isFinished ? null : checkingValue;

      if (calcWinner) break;

      winningCombosIndex++;
    }

    return calcWinner;
  }

  function resetGame() {
    setBoard(initGame.board);
    setCurrentPlayer(initGame.player);
    setTotalTurns(initGame.totalTurns);
    setWinner(initGame.winner);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="py-4 text-3xl font-bold">Welcome to Tic Tac Toe!</h1>
      <Board board={board} onClick={(i) => handleClick(i)} />
      {winner && (
        <div>{winner !== 'DRAW' ? `The winner is Player ${winner}!` : 'Its a draw'}</div>
      )}
      <button
        className="my-4 flex max-w-xs flex-col gap-4 rounded-md border-2 border-gray-600 bg-white py-2 px-6 text-black drop-shadow hover:bg-gray-500 hover:text-white"
        onClick={() => resetGame()}
      >
        Reset Game
      </button>
      <Scoreboard
        isLoading={loadingAllWinners}
        xWins={allWinnersData?.find((data) => data.winner === 'X')?.count || 0}
        oWins={allWinnersData?.find((data) => data.winner === 'O')?.count || 0}
        draws={allWinnersData?.find((data) => data.winner === 'DRAW')?.count || 0}
      />
    </div>
  );
};

export default Game;
