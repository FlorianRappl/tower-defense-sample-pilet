import * as React from 'react';

let game: Game = undefined;

const TowerDefense: React.FC = () => {
  const host = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    if (!game) {
      game = new Game();
    }

    game.init(host.current);
    game.resume();
    return () => game.pause();
  }, []);

  return (
    <div className="tower-defense-page" ref={host}>
      <div id="wait">
        <div id="wait-message">Loading ...</div>
      </div>
      <div id="frame" className="hidden">
        <div id="info">
          <div id="money-info" title="Money left"></div>
          <div id="tower-info" title="Towers built"></div>
          <div id="health-info" title="Health left"></div>
          <div id="time-info">Game started ...</div>
          <div id="sound-info" className="on" title="Sound status"></div>
        </div>
        <div id="nextwave"></div>
        <canvas id="game" width={900} height={450}>
          <p>
            <b>Your browser does not support the canvas element.</b>
          </p>
          <p>This indicates that you are really stuck in the past (sorry!). Please get a new browser.</p>
        </canvas>
        <div id="towers"></div>
        <div id="buttons">
          <button id="startWave">
            Start Wave (#<span>1</span>)
          </button>
          <button id="buyMedipack">
            Buy Medipack ($<span>0</span>)
          </button>
          <button id="buyTowerbuild">
            Buy Towerbuild ($<span>0</span>)
          </button>
        </div>
      </div>
    </div>
  );
};

export default TowerDefense;
