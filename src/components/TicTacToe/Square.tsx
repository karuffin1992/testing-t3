import type { SquareProps } from './types';

const Square: React.FC<SquareProps> = (props) => {
  return (
    <button
      className="float-left -mr-px -mt-px h-32 w-32 border-4 border-solid border-gray-900 bg-white p-0 text-center text-4xl font-bold hover:bg-gray-200"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
