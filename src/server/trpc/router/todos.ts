import { router, publicProcedure } from '../trpc';
import { addTodo, markCompletedById, removeById } from '../../schema/todos.schema';

export const toDosRouter = router({
  getTodos: publicProcedure.query(async ({ ctx }) => {
    const results = await ctx.prisma.toDos;

    return results;
  }),
  addTodo: publicProcedure.input(addTodo).mutation(async ({ ctx, input }) => {
    const addWinner = await ctx.prisma.toDos.create({
      data: input,
    });

    return addWinner;
  }),
  todoCompleted: publicProcedure
    .input(markCompletedById)
    .mutation(async ({ ctx, input }) => {
      const completed = await ctx.prisma.toDos.update({
        where: {
          id: input.id,
        },
        data: {
          isCompleted: input.isCompleted,
        },
      });

      return completed;
    }),
  removeTodo: publicProcedure.input(removeById).mutation(async ({ ctx, input }) => {
    const completed = await ctx.prisma.toDos.update({
      where: {
        id: input.id,
      },
      data: {
        isDeleted: input.isDeleted,
      },
    });

    return completed;
  }),
});
