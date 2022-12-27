import z from 'zod';

export const addTodo = z.object({
  description: z.string().min(1),
});

export const markCompletedById = z.object({
  id: z.string(),
  isCompleted: z.boolean(),
});

export const removeById = z.object({
  id: z.string(),
  isDeleted: z.boolean(),
});
