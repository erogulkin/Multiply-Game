import { useState, useEffect } from 'react';
import Menu from './components/Menu';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [gameConfig, setGameConfig] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [maxScore, setMaxScore] = useState(() => {
    const saved = localStorage.getItem('maxScore');
    return saved ? parseInt(saved) : 0;
  });

  const startGame = (config) => {
    setGameConfig(config);
    setScreen('game');
  };

  const finishGame = (score, correct, total) => {
    setGameResult({ score, correct, total });
    const newMax = Math.max(maxScore, score);
    setMaxScore(newMax);
    localStorage.setItem('maxScore', newMax);
    setScreen('result');
  };

  const backToMenu = () => {
    setScreen('menu');
    setGameConfig(null);
    setGameResult(null);
  };

  return (
    <div className="app">
      {screen === 'menu' && <Menu onStart={startGame} maxScore={maxScore} />}
      {screen === 'game' && (
        <GameScreen
          config={gameConfig}
          onFinish={finishGame}
          maxScore={maxScore}
        />
      )}
      {screen === 'result' && (
        <ResultScreen result={gameResult} onPlayAgain={backToMenu} />
      )}
    </div>
  );
}
