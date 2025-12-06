// frontend/src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img 
        src={product.image_url || 'placeholder.jpg'} 
        alt={product.name} 
        className="product-image" 
      />
      <h3>{product.name}</h3>
      <p className="category">{product.category}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      <Link to={`/products/${product.id}`} className="details-button">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;