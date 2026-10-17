// src/components/Header.jsx
export default function Header({ score, bestScore }) {
  return (
    <header className="header">
      <div className="title-section">
        <h1>Memory Card</h1>
        <p className="subtitle">
          Get points by clicking on an image, but don&apos;t click on any more than once!
        </p>
      </div>
      <div className="scoreboard">
        <div className="score-box">
          <span>Score:</span> <strong>{score}</strong>
        </div>
        <div className="score-box">
          <span>Best Score:</span> <strong>{bestScore}</strong>
        </div>
      </div>
    </header>
  );
}