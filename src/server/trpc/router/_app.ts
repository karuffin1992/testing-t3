import { router } from '../trpc';
import { authRouter } from './auth';
import { exampleRouter } from './example';
import { ticTacToeRouter } from './tictactoe';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  ticTacToe: ticTacToeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
