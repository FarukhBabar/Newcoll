import React, { useState } from 'react';
import "./Style.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const toggleSearchBar = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://api.homeessentialshive.co.uk/api/products', {
        params: { q: searchTerm }
      });
      setProducts(response.data);

      // Navigate to the All Products page with search results
      navigate('/all-products', { state: { products: response.data } });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid navbar-container">
          <div className="navbar-logo">
            <a><img src='/Images/Black Mirebs Collection.png' alt='logo' className='logomain' /></a>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav listof me-auto mb-2 mb-lg-0">
              <li>
                <a className="nav-link active text-dark" href="#">Home</a>
              </li>
               <li>
                <a className="nav-link active text-dark" href="#">Shop</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="dropdownMenuButton" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Collections
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div className="d-flex flex-column flex-lg-row">
                    <div className="me-5 text-center">
                      <h4 className=''>Pret</h4>
                      <hr />
                      <a className="dropdown-item" href="#">Printed</a>
                      <a className="dropdown-item" href="#">Embroidered</a>
                      <a className="dropdown-item" href="#">Solids</a>
                      <a className="dropdown-item" href="#">Anyday</a>
                      <a className="dropdown-item" href="#">1 Piece</a>
                      <a className="dropdown-item" href="#">2 Piece</a>
                      <a className="dropdown-item" href="#">3 Piece</a>
                      <a className="dropdown-item" href="#">Slips</a>
                      <a className="dropdown-item" href="#">Bottoms</a>
                    </div>
                    <div className="me-5 text-center">
                      <h4>Cosmetics</h4>
                      <hr />
                      <a className="dropdown-item" href="#">Eid 2 Any Day</a>
                      <a className="dropdown-item" href="#">Printed</a>
                      <a className="dropdown-item" href="#">Embroidered</a>
                      <a className="dropdown-item" href="#">Anyday</a>
                      <a className="dropdown-item" href="#">2 Piece</a>
                      <a className="dropdown-item" href="#">3 Piece</a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link aboutus" href="#">About Us</a>
              </li>
            </ul>
          </div>
          <div className="navbar-icons">
            <div className='me-3'>
              <i className="bi bi-person fs-4"></i>
            </div>
            <div className='me-3' onClick={toggleSearchBar} style={{ cursor: 'pointer' }}>
              <i className="bi bi-search fs-4"></i>
            </div>
            <div className='me-3'>
              <i className="bi bi-bag-fill fs-4"></i>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Overlay */}
      <div className={`background-overlay ${searchOpen ? 'open' : ''}`} onClick={toggleSearchBar}></div>

      {/* Sliding Search Bar */}
      <div className={`search-bar ${searchOpen ? 'open' : ''}`}>
        <div className="search-bar-content">
          <input 
            type="text" 
            placeholder="Search..." 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="form-control" 
            onKeyPress={handleKeyPress}
          />
          <button className="btn btn-primary" onClick={toggleSearchBar}>Close</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
