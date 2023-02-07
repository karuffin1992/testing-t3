import type { ScoreboardProps } from './types';

const Scoreboard: React.FC<ScoreboardProps> = (props) => {
  return (
    <div className="w-80 py-4">
      {props.isLoading && <div>Loading...</div>}
      {!props.isLoading && (
        <>
          <div className="grid grid-cols-3 py-2 text-center text-gray-100">
            <div>
              <div className="text-2xl">Player X</div>
              <div className="text-lg">{props.xWins}</div>
            </div>
            <div>
              <div className="text-2xl">Draws</div>
              <div className="text-lg">{props.draws}</div>
            </div>
            <div>
              <div className="text-2xl">Player O</div>
              <div className="text-lg">{props.oWins}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Scoreboard;
