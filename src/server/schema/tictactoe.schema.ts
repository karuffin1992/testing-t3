import z from 'zod';

export const addGameWinner = z.object({
  winner: z.string().min(1),
});
