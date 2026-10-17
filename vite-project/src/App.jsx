// src/App.jsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import './App.css';

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameWon, setGameWon] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false); // Controls 3D flipping state

  useEffect(() => {
    let ignore = false;
    const pokemonIds = [1, 4, 7, 25, 39, 52, 54, 94, 133, 143, 150, 151];

    async function fetchPokemon() {
      try {
        setLoading(true);
        const promises = pokemonIds.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await response.json();
          return {
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default,
          };
        });

        const results = await Promise.all(promises);
        if (!ignore) {
          setCards(shuffleArray(results));
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch Pokemon:', error);
        if (!ignore) setLoading(false);
      }
    }

    fetchPokemon();
    return () => { ignore = true; };
  }, []);

  const handleCardClick = (id) => {
    if (isFlipping) return; // Prevent spam clicks during animation

    // Start 3D Card flips
    setIsFlipping(true);

    // Timeout allows the card back pattern to hide and shuffle out of sight halfway (0.3s)
    setTimeout(() => {
      let isLoss = clickedIds.includes(id);
      
      if (isLoss) {
        setScore(0);
        setClickedIds([]);
        setGameWon(false);
      } else {
        const newScore = score + 1;
        const newClickedIds = [...clickedIds, id];

        setScore(newScore);
        setClickedIds(newClickedIds);

        if (newScore > bestScore) {
          setBestScore(newScore);
        }

        if (newScore === cards.length) {
          setGameWon(true);
        }
      }

      setCards((prevCards) => shuffleArray(prevCards));

      // Show cards once the shuffle is complete (0.6s)
      setTimeout(() => {
        setIsFlipping(false);
      }, 300);

    }, 300);
  };

  const resetGame = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setScore(0);
      setClickedIds([]);
      setGameWon(false);
      setCards((prevCards) => shuffleArray(prevCards));
      setTimeout(() => {
        setIsFlipping(false);
      }, 300);
    }, 300);
  };

  return (
    <div className="app-container">
      <Header score={score} bestScore={bestScore} />

      {gameWon && (
        <div className="win-banner">
          <h2>🎉 You caught &apos;em all! Perfect memory! (12/12)</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading Pokémon cards...</div>
      ) : (
        <GameBoard cards={cards} onCardClick={handleCardClick} isFlipping={isFlipping} />
      )}
    </div>
  );
}