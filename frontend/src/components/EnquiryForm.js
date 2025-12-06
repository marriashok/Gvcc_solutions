// frontend/src/components/EnquiryForm.js
import React, { useState } from 'react';
import axios from 'axios';

function EnquiryForm({ productId, productName, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name || !email || !message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields (Name, Email, Message).' });
      return false;
    }
    if (!emailRegex.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await axios.post('/api/enquiries', {
        product_id: productId,
        ...formData
      });
      setStatus({ type: 'success', message: `Enquiry for ${productName} submitted successfully!` });
      // Clear form after success
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      const msg = error.response?.data?.error || 'An unexpected error occurred during submission.';
      setStatus({ type: 'error', message: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&times;</button>
        <h3>Enquire about: **{productName}**</h3>
        
        <form onSubmit={handleSubmit} className="enquiry-form">
          <label htmlFor="name">Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="email">Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          
          <label htmlFor="phone">Phone (Optional)</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
          />

          <label htmlFor="message">Message *</label>
          <textarea 
            id="message" 
            name="message" 
            rows="4" 
            value={formData.message} 
            onChange={handleChange} 
            required
          ></textarea>

          {status.type && (
            <p className={`status-message ${status.type}`}>
              {status.message}
            </p>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnquiryForm;