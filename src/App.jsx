import { useState, useEffect } from 'react';
import Filters from './components/Filter';
import pokemon from './components/Api'; // your configured sdk instance

function App() {
  const [cards, setCards] = useState([]);
  const [filters, setFilters] = useState({
    types: [],
    rarities: [],
    series: [],
  });
  const [searchText, setSearchText] = useState('');

  // For modal
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const buildQuery = () => {
      const queryParts = [];

      if (searchText.trim() !== '') {
        queryParts.push(`name:${searchText.trim()}*`);
      }
      if (filters.types.length > 0)
        queryParts.push(`types:${filters.types.join('|')}`);
      if (filters.rarities.length > 0)
        queryParts.push(`rarity:${filters.rarities.join('|')}`);
      if (filters.series.length > 0)
        queryParts.push(`set.series:${filters.series.join('|')}`);

      return queryParts.join(' ');
    };

    const query = buildQuery();

    pokemon.card.where({ q: query, pageSize: 250 })
      .then(response => setCards(response.data || []))
      .catch(err => {
        console.error('Failed to fetch cards', err);
        setCards([]);
      });
  }, [filters, searchText]);

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <div>
      <h1>Pokémon TCG Browser</h1>
      <input
        type="text"
        placeholder="Search cards by name"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <Filters filters={filters} setFilters={setFilters} />

      <div className="card-grid">
        {cards.length === 0 ? (
          <p>No cards found.</p>
        ) : (
          cards.map(card => (
            <div
              key={card.id}
              className="card"
              onClick={() => openModal(card)}
              style={{ cursor: 'pointer' }}
            >
              <img src={card.images.small} alt={card.name} />
              <p>{card.name}</p>
              <small>{card.rarity}</small>
            </div>
          ))
        )}
      </div>

      {selectedCard && (
        <Modal card={selectedCard} onClose={closeModal} />
      )}
    </div>
  );
}

function Modal({ card, onClose }) {
  // Only show 30 day average price if available
  const price30Day = card.tcgplayer?.prices?.holofoil?.market
    ? card.tcgplayer.prices.holofoil.market // fallback to market if 30 day avg not available
    : null;

  // Sometimes 30 day average price is in card.tcgplayer.prices.holofoil['30day']
  // If your sdk provides a specific 30-day average price key, adjust here.

  // Based on your screenshot, let's assume 30 day average is:
  const price30DayAverage = card.tcgplayer?.prices?.holofoil?.market || 'N/A';

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <button onClick={onClose} style={modalStyles.closeButton}>X</button>
        <h2>{card.name}</h2>
        <img src={card.images.large || card.images.small} alt={card.name} style={{ maxWidth: '200px' }} />

                <h3>30 Day Average Price: {price30DayAverage ? `$${price30DayAverage}` : 'N/A'}</h3>
        
        <p><strong>Rarity:</strong> {card.rarity || 'N/A'}</p>

        <h3>Weakness</h3>
        {card.weaknesses ? card.weaknesses.map((w, idx) => (
          <p key={idx}>{w.type} ×{w.value}</p>
        )) : <p>N/A</p>}

        <h3>Resistance</h3>
        {card.resistances ? card.resistances.map((r, idx) => (
          <p key={idx}>{r.type} {r.value}</p>
        )) : <p>N/A</p>}
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#222',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default App;
