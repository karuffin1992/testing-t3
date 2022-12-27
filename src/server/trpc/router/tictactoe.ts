import { router, publicProcedure } from '../trpc';
import { addGameWinner } from '../../schema/tictactoe.schema';

export const ticTacToeRouter = router({
  getAllWinners: publicProcedure.query(async ({ ctx }) => {
    const results = await ctx.prisma.ticTacToe.groupBy({
      by: ['winner'],
      _count: {
        _all: true,
      },
    });

    const resultsMap = results.map((result) => {
      return {
        winner: result.winner,
        count: result._count._all,
      };
    });

    return resultsMap;
  }),
  addWinner: publicProcedure.input(addGameWinner).mutation(async ({ ctx, input }) => {
    const addWinner = await ctx.prisma.ticTacToe.create({
      data: input,
    });

    return addWinner;
  }),
});
