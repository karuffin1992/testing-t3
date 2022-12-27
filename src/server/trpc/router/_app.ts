import { router } from '../trpc';
import { authRouter } from './auth';
import { exampleRouter } from './example';
import { ticTacToeRouter } from './tictactoe';
import { toDosRouter } from './todos';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  ticTacToe: ticTacToeRouter,
  toDos: toDosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
