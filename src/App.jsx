// In App.js
import { useEffect, useState } from 'react';

function App() {
  const [cards, setCards] = useState([]);

 useEffect(() => {
  fetch('https://api.pokemontcg.io/v2/cards?pageSize=250', {
    headers: {
      'X-Api-Key': 'your-api-key-here'
    }
  })
    .then(res => res.json())
    .then(data => setCards(data.data))
    .catch(err => console.error(err));
}, []);


  return (
    <div>
      {cards.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cards.map(card => (
            <li key={card.id}>
              <img src={card.images.small} alt={card.name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
