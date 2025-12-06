// frontend/src/components/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EnquiryForm from './EnquiryForm';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Navigate to a 404 page or back home if product not found
        navigate('/', { replace: true }); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (isLoading) {
    return <div className="loading">Loading product details...</div>;
  }
  
  if (!product) {
    return <div className="error-message">Product not found.</div>;
  }

  return (
    <div className="product-details">
      <button onClick={() => navigate(-1)} className="back-button">← Back to List</button>
      
      <div className="details-content">
        <img 
          src={product.image_url || 'placeholder.jpg'} 
          alt={product.name} 
          className="product-details-image" 
        />
        <div className="text-content">
          <h2>{product.name}</h2>
          <p className="category-tag">{product.category}</p>
          <p className="price-tag">${product.price.toFixed(2)}</p>
          
          <h3>Summary</h3>
          <p>{product.short_desc}</p>
          
          <h3>Full Description</h3>
          <p>{product.long_desc}</p>
          
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="enquire-button"
          >
            Submit Enquiry
          </button>
        </div>
      </div>

      {isModalOpen && (
        <EnquiryForm 
          productId={product.id} 
          productName={product.name} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}

export default ProductDetails;