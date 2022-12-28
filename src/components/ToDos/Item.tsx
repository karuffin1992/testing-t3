import type { ItemProps } from './types';

const Item: React.FC<ItemProps> = (props) => {
  return (
    <div className="my-4 flex justify-between px-4" key={props.todo.id}>
      <div className="flex w-2/3 items-center">
        <input
          checked={props.todo.isCompleted || false}
          onChange={(e) => props.markCompleted(props.todo.id, e)}
          className="float-left my-1 h-4 w-4 cursor-pointer rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
          type="checkbox"
          value=""
        />
        <div
          className={`${props.todo.isCompleted ? 'text-gray-500 line-through' : ''} pl-4`}
        >
          {props.todo.description}
        </div>
      </div>
      <div>
        <button
          className="flex-shrink-0 rounded border-2 border-red-600 bg-red-500 py-1 px-2 text-sm text-white hover:border-red-700 hover:bg-red-700"
          onClick={() => props.removeToDo(props.todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Item;
