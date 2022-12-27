import type { SquareProps } from './types';

const Square: React.FC<SquareProps> = (props) => {
  return (
    <button
      className="float-left -mr-px -mt-px h-8 w-8 border-2 border-solid border-black bg-white p-0 text-center text-2xl font-bold hover:bg-gray-200"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
