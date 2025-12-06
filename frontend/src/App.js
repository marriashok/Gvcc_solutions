// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Register from './components/Register';
import './styles/App.css'; // Import base styles

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <header className="header">
        <nav className="navbar">
          <Link to="/" className="logo-link"><h1>Product Showcase</h1></Link>
          <div className="nav-links">
            {user ? (
              <>
                <span className="user-name">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Sign In</Link>
                <Link to="/register" className="nav-link">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;