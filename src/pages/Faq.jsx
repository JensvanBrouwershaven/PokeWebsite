import React, { useState } from 'react';
import '../App'

const faqData = [
  {
    question: 'Waar kan ik mijn verzamelde kaarten en favorieten bekijken?',
    answer: 'Je kunt je verzamelde kaarten en favorieten bekijken op je profielpagina nadat je een account hebt aangemaakt en ingelogd bent.',
  },
  {
    question: 'Hoe filter ik kaarten op type, generatie of zeldzaamheid?',
    answer: 'Gebruik de filteropties bovenaan de kaartlijst om kaarten te filteren op type, generatie, zeldzaamheid en serie. Je kunt meerdere filters tegelijk selecteren.',
  },
  {
    question: 'Hoe kan ik zoeken naar een specifieke kaart?',
    answer: 'Gebruik de zoekbalk bovenaan om te zoeken op kaartnaam, set of andere kenmerken.',
  },
  {
    question: 'Is het mogelijk om kaarten toe te voegen aan favorieten?',
    answer: 'Ja, klik op het hart-icoon op een kaart om deze aan je favorieten toe te voegen.',
  },
  {
    question: 'Hoe vaak wordt de kaartendatabase bijgewerkt?',
    answer: 'De database wordt regelmatig bijgewerkt met nieuwe sets en kaarten zodra ze officieel beschikbaar zijn.',
  },
];


const styles = {
  container: {
    maxWidth: '700px',
    margin: '6rem auto',
    padding: '20px',
    backgroundColor: '#727272',
    color: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 5px rgba(0,0,0,0.6)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2rem',
    textShadow: '1px 1px 2px black',
  },
  searchInput: {
    width: '100%',
    padding: '10px 15px',
    fontSize: '1rem',
    marginBottom: '25px',
    borderRadius: '6px',
    border: 'none',
    outline: 'none',
  },
  faqItem: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#222222',
    borderRadius: '8px',
  },
  question: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginBottom: '8px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",

  },
  answer: {
    fontSize: '1rem',
    lineHeight: '1.4',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",

  },
};

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredFaq = faqData.filter(({ question, answer }) => {
    const lower = searchTerm.toLowerCase();
    return question.toLowerCase().includes(lower) || answer.toLowerCase().includes(lower);
  });

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Veelgestelde Vragen (FAQ)</h1>
      <input
        type="text"
        placeholder="Zoek in FAQ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      {filteredFaq.length > 0 ? (
        filteredFaq.map(({ question, answer }, index) => (
          <div key={index} style={styles.faqItem}>
            <div style={styles.question} onClick={() => toggleExpand(index)}>
              {question}
            </div>
            {expandedIndex === index && <div style={styles.answer}>{answer}</div>}
          </div>
        ))
      ) : (
        <p>Geen resultaten gevonden voor je zoekopdracht.</p>
      )}
    </div>
  );
};

export default Faq;
