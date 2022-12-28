import React, { useState } from 'react';
import { trpc } from '../../utils/trpc';
import Item from './Item';

const List: React.FC = () => {
  const {
    data: allTodos,
    isLoading: loadingTodos,
    refetch: refetchTodos,
  } = trpc.toDos.getTodos.useQuery();
  const addTodoMutation = trpc.toDos.addTodo.useMutation();
  const todoCompletedMutation = trpc.toDos.todoCompleted.useMutation();
  const removeTododMutation = trpc.toDos.removeTodo.useMutation();

  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    addTodoMutation.mutate(
      { description },
      {
        onSuccess: () => {
          refetchTodos();
          setDescription('');
        },
      }
    );
  };

  const markCompleted = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    todoCompletedMutation.mutate(
      { id, isCompleted: e.target.checked },
      {
        onSuccess: () => {
          refetchTodos();
        },
      }
    );
  };

  const removeToDo = (id: string) => {
    removeTododMutation.mutate(
      { id, isDeleted: true },
      {
        onSuccess: () => {
          refetchTodos();
        },
      }
    );
  };

  return (
    <div className="container mx-auto px-48">
      <h1 className="py-4 text-center text-3xl font-bold">To Do List</h1>
      <form className="w-full py-2" onSubmit={handleSubmit}>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="mr-3 w-full appearance-none border-none bg-transparent py-1 px-2 leading-tight text-gray-700 focus:outline-none"
            name="description"
            type="text"
            placeholder="Enter description"
            aria-label="Enter description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button
            className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 py-1 px-2 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
            type="submit"
          >
            + Add To Do
          </button>
        </div>
      </form>
      <div className="py-4">
        {loadingTodos && <div>Loading...</div>}
        {allTodos && (
          <>
            {allTodos
              .filter((todo) => !todo.isDeleted)
              .map((todo) => {
                return (
                  <Item
                    key={todo.id}
                    todo={todo}
                    markCompleted={markCompleted}
                    removeToDo={removeToDo}
                  />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default List;
