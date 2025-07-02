import { useState, useEffect } from 'react';
import Filters from '../components/Filter';
import pokemon from '../components/Api'; // your configured sdk instance
import '../App.css'

function Cards() {
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

  if (filters.rarities.length > 0) {
    const quotedRarities = filters.rarities
      .map(r => (r.includes(' ') ? `"${r}"` : r))
      .join('|');
    queryParts.push(`rarity:${quotedRarities}`);
  }

  if (filters.series.length > 0) {
    const quotedSeries = filters.series
      .map(s => (s.includes(' ') ? `"${s}"` : s))
      .join('|');
    queryParts.push(`set.series:${quotedSeries}`);
  }

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
    <div className="FlexboxProductPageNav">
      <div className='filterbarDiv' >
        <div className='SearchBarDiv'>
      <input
        type="text"
        placeholder="Search cards by name"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      className='SearchBar'
      />
      </div>
      <Filters filters={filters} setFilters={setFilters} />
</div>
<div className='mainContent'>
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
</div>
      {selectedCard && (
        <Modal card={selectedCard} onClose={closeModal} />
      )}
    </div>
  );
}

// Put modalStyles outside Modal so it’s in scope
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
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#222',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
    justifyContent: "center",
    alignItems: 'center',
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

function Modal({ card, onClose }) {
  const [favorites, setFavorites] = useState(() => {
    const fav = localStorage.getItem('favorites');
    return fav ? JSON.parse(fav) : [];
  });
  const [collected, setCollected] = useState(() => {
    const coll = localStorage.getItem('collected');
    return coll ? JSON.parse(coll) : [];
  });

  const isFavorite = favorites.some(c => c.id === card.id);
  const isCollected = collected.some(c => c.id === card.id);

  const toggleFavorite = () => {
    let updatedFav;
    if (isFavorite) {
      updatedFav = favorites.filter(c => c.id !== card.id);
    } else {
      updatedFav = [...favorites, card];
    }
    setFavorites(updatedFav);
    localStorage.setItem('favorites', JSON.stringify(updatedFav));
  };

  const toggleCollected = () => {
    let updatedCollected;
    if (isCollected) {
      updatedCollected = collected.filter(c => c.id !== card.id);
    } else {
      updatedCollected = [...collected, card];
    }
    setCollected(updatedCollected);
    localStorage.setItem('collected', JSON.stringify(updatedCollected));
  };

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

        {/* Toggle Buttons */}
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={toggleFavorite}
            style={{ marginRight: '10px', padding: '8px', cursor: 'pointer' }}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>

          <button
            onClick={toggleCollected}
            style={{ padding: '8px', cursor: 'pointer' }}
          >
            {isCollected ? 'Remove from Collected' : 'Add to Collected'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;