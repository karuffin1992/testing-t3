interface Todo {
  id: string;
  description: string;
  isCompleted: boolean | null;
  isDeleted: boolean | null;
}

export interface ItemProps {
  todo: Todo;
  markCompleted: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  removeToDo: (id: string) => void;
}
