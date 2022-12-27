import type { ScoreboardProps } from './types';

const Scoreboard: React.FC<ScoreboardProps> = (props) => {
  return (
    <div className="w-80 py-4 drop-shadow-md">
      <div className="flex items-center justify-center border-2 border-solid border-black">
        Score
      </div>
      {props.isLoading && <div>Loading...</div>}
      {!props.isLoading && (
        <>
          <div className="grid grid-cols-3 border-x-2 border-b-2 border-black py-2 text-center">
            <div>
              <div>X</div>
              <div>{props.xWins}</div>
            </div>
            <div>
              <div>O</div>
              <div>{props.oWins}</div>
            </div>
            <div>
              <div>Draws</div>
              <div>{props.draws}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Scoreboard;
