import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css'; // Add this import to apply custom styles

const MostSellingProducts = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    const formattedName = product.name
      .replace(/\s+/g, '-')        // Replace spaces with hyphens
      .replace(/[^a-zA-Z0-9-]/g, '') // Remove non-alphanumeric characters except hyphens
      .toLowerCase();             // Convert to lowercase

    navigate(`/product/${formattedName}`);
  };

  return (
    <div className="container my-5">
     
      <div className="row">
        {products.slice(0, 8).map((product) => (
          <div className="col-md-3 col-sm-6 mb-4" key={product._id}>
            <div
              className="card product-card"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={`https://api.homeessentialshive.co.uk/${product.image.replace(/\\/g, '/')}`}
                className="card-img-top product-image"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title product-name">{product.name}</h5>
                <p className="card-text product-price">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostSellingProducts;
