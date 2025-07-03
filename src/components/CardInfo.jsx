import React from 'react';

const CardInfo = ({ card, isOpen, onClose }) => {
  if (!isOpen || !card) return null;

  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999, // Increased z-index to ensure it's above everything
    },
    modal: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "black",
      color: "white",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "800px",
      width: "90%",
      maxHeight: "80vh",
      overflowY: "auto",
      position: "relative",
      gap: "20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)", // Added shadow for better visibility
    },
    closeButton: {
      position: "absolute",
      right: 10,
      top: 10,
      background: "rgba(255,255,255,0.2)",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "5px 10px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background-color 0.2s",
    },
    imageContainer: {
      flex: "0 0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    cardImage: {
      maxWidth: "300px",
      maxHeight: "400px",
      objectFit: "contain",
      borderRadius: "4px",
    },
    infoContainer: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: "20px",
    },
    cardTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      margin: "0 0 15px 0",
    },
    cardDetail: {
      margin: "5px 0",
      fontSize: "1rem",
    },
  };

  // Handle escape key to close modal
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <div 
      style={modalStyles.overlay} 
      onClick={onClose}
    >
      <div 
        style={modalStyles.modal} 
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={modalStyles.closeButton}
          onClick={onClose}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        >
          ✕
        </button>
        
        <div style={modalStyles.imageContainer}>
          <img 
            src={card.images?.large || card.images?.small || ''} 
            alt={card.name} 
            style={modalStyles.cardImage}
          />
        </div>
        
        <div style={modalStyles.infoContainer}>
          <h2 style={modalStyles.cardTitle}>{card.name}</h2>
          <p style={modalStyles.cardDetail}>Rarity: {card.rarity}</p>
          {card.hp && <p style={modalStyles.cardDetail}>HP: {card.hp}</p>}
          {card.types && <p style={modalStyles.cardDetail}>Type: {card.types.join(", ")}</p>}
          {card.set && <p style={modalStyles.cardDetail}>Set: {card.set.name}</p>}
          {card.number && <p style={modalStyles.cardDetail}>Card Number: {card.number}</p>}
          {card.artist && <p style={modalStyles.cardDetail}>Artist: {card.artist}</p>}
        </div>
      </div>
    </div>
  );
};

export default CardInfo;