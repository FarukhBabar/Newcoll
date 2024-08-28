import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Buttonsstyles.css'; // Updated CSS file name for better clarity

const SignatureFabrics = () => {
  const [selectedFabric, setSelectedFabric] = useState('FULL EMBROIDERY'); // Set default fabric
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  const fabrics = [
    {
      name: 'FULL EMBROIDERY',
      apiEndpoint: 'https://api.homeessentialshive.co.uk/api/products/most-selling',
    },
    {
        name: 'COTTON',
        apiEndpoint: 'https://api.homeessentialshive.co.uk/api/products',
    },
    {
      name: 'LOAN',
      apiEndpoint: 'http://localhost:5000/api/fabrics/aza',
    },
    // Add more fabric options as needed
  ];

  useEffect(() => {
    if (selectedFabric) {
      const fabric = fabrics.find(fabric => fabric.name === selectedFabric);
      if (fabric) {
        axios.get(fabric.apiEndpoint)
          .then(response => {
            setCards(response.data.slice(0, 4)); // Show only 4 products on the homepage
          })
          .catch(error => {
            console.error("There was an error fetching the cards!", error);
          });
      }
    }
  }, [selectedFabric]);

  const handleButtonClick = (fabricName) => {
    setSelectedFabric(fabricName);
  };

  const handleShowMoreClick = () => {
    const formattedFabricName = selectedFabric.replace(/\s+/g, '-').toLowerCase();
    navigate(`/fabrics/${formattedFabricName}`);
  };

  return (
    <div className='signature-fabrics-container'>
      <div className='title-section'>
        <h4 >SHOP OUR SIGNATURE FABRICS</h4>
      </div>
      <div className='fabric-buttons'>
        {fabrics.map((fabric) => (
          <button
            className={`fabric-button ${selectedFabric === fabric.name ? 'active' : ''}`}
            onClick={() => handleButtonClick(fabric.name)}
            key={fabric.name}
          >
            {fabric.name}
          </button>
        ))}
      </div>
      <div className='cards-section'>
        {cards.map((card, index) => (
          <div className="fabric-card" key={index}>
            <div className="card-image">
              {card.image && (
                <img
                  src={`https://api.homeessentialshive.co.uk/${card.image}`}
                  alt={card.name}
                  className="img-fluid"
                />
              )}
            </div>
            <div className="card-content">
              <h5>{card.name.slice(0, 25)}</h5>
              <p dangerouslySetInnerHTML={{ __html: card.title.slice(0, 25) }}></p>
              
            </div>
          </div>
        ))}
      </div>
      {cards.length > 0 && (
        <div className='show-more'>
          <button className='show-more-btn' onClick={handleShowMoreClick}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default SignatureFabrics;
