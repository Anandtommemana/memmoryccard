// src/components/GameBoard.jsx
import Card from './Card';

export default function GameBoard({ cards, onCardClick, isFlipping }) {
  return (
    <main className="game-board">
      {cards.map((card) => (
        <Card 
          key={card.id} 
          card={card} 
          onCardClick={onCardClick} 
          isFlipped={isFlipping} 
        />
      ))}
    </main>
  );
}