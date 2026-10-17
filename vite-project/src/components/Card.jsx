// src/components/Card.jsx
export default function Card({ card, onCardClick, isFlipped }) {
  return (
    <div className={`card-container ${isFlipped ? 'flipped' : ''}`}>
      <button 
        className="card-inner" 
        onClick={() => !isFlipped && onCardClick(card.id)}
        disabled={isFlipped}
        aria-label={`Select ${card.name}`}
      >
        {/* Card Front (Actual Pokémon data) */}
        <div className="card-face card-front">
          <div className="card-image-wrapper">
            <img src={card.image} alt={card.name} loading="lazy" />
          </div>
          <p className="card-name">{card.name}</p>
        </div>

        {/* Card Back (Shown during flip animation) */}
        <div className="card-face card-back">
          <div className="card-back-pattern">
            <div className="poke-ball-inner" />
          </div>
        </div>
      </button>
    </div>
  );
}