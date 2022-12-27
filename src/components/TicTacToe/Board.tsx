import type { BoardProps } from './types';
import Square from './Square';

const Board: React.FC<BoardProps> = (props) => {
  return (
    <div className="py-6">
      <div className="grid grid-cols-3">
        {props.board.map((square, i) => {
          return <Square key={i} value={square} onClick={() => props.onClick(i)} />;
        })}
      </div>
    </div>
  );
};

export default Board;
