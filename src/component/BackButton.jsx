import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/BackButton.css';

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <button
      type="button"
      className="back-button"
      onClick={handleBack}
    >
      ← Back
    </button>
  );
}

export default BackButton;