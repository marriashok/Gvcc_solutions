// frontend/src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // Display 6 items per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // API call using the configured proxy
        const response = await axios.get(`/api/products`, {
          params: { 
            search: search, 
            category: category, 
            page: currentPage, 
            limit: limit 
          }
        });
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [search, category, currentPage]); // Re-fetch when these states change

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset page on new search
  };
  
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1); // Reset page on new filter
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  // Hardcoded categories based on seed data
  const categories = ['All', 'Electronics', 'Accessories', 'Books', 'Furniture'];

  return (
    <div className="product-list-container">
      <h2>Browse Products</h2>
      <div className="controls">
        <input 
          type="text" 
          value={search} 
          onChange={handleSearchChange} 
          placeholder="Search by name or description"
          aria-label="Search products"
        />
        <select value={category} onChange={handleCategoryChange} aria-label="Filter by category">
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found matching your criteria.</p>
        )}
      </div>

      <div className="pagination">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;