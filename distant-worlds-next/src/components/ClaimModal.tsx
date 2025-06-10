'use client';

import { useState } from 'react';
import { Planet, ClaimData } from '@/types/planet';

interface ClaimModalProps {
  planet: Planet | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (claimData: ClaimData) => void;
}

export default function ClaimModal({ planet, isOpen, onClose, onSubmit }: ClaimModalProps) {
  const [formData, setFormData] = useState({
    claimerName: '',
    claimerEmail: '',
    claimMessage: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (planet) {
      onSubmit({
        planet,
        claimerName: formData.claimerName,
        claimerEmail: formData.claimerEmail,
        claimMessage: formData.claimMessage
      });
      setFormData({ claimerName: '', claimerEmail: '', claimMessage: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen || !planet) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Claim Planet</h2>
          <button
            onClick={onClose}
            className="close-modal"
          >
            &times;
          </button>
        </div>
        
        <div className="modal-planet-info">
          <h3 className="modal-planet-name">
            Planet #{planet.planet_id}: {planet.name}
          </h3>
          <p className="modal-scientific-name">
            {planet.scientific_name}
          </p>
          <p className="modal-description">
            {planet.description}
          </p>
          <div className="modal-price">
            ${planet.price}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="claimerName">
              Your Name: *
            </label>
            <input
              type="text"
              id="claimerName"
              name="claimerName"
              value={formData.claimerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="claimerEmail">
              Your Email: *
            </label>
            <input
              type="email"
              id="claimerEmail"
              name="claimerEmail"
              value={formData.claimerEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="claimMessage">
              Message (optional):
            </label>
            <textarea
              id="claimMessage"
              name="claimMessage"
              value={formData.claimMessage}
              onChange={handleChange}
              rows={3}
              placeholder="Any specific requests or comments..."
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="claim-modal-btn cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="claim-modal-btn"
            >
              Claim Planet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 