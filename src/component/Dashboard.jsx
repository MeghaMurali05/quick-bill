import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Product Management',
      description: 'Manage products and stock details',
      icon: '📦',
      path: '/product',
    },
    {
      title: 'Staff Management',
      description: 'View and manage staff members',
      icon: '👥',
      path: '/staff',
    },
    {
      title: 'Billing',
      description: 'Create customer bills',
      icon: '🧾',
      path: '/billing',
    },
    {
      title: 'Transactions',
      description: 'View billing transactions',
      icon: '💳',
      path: '/transaction',
    },
    {
      title: 'Product Returns',
      description: 'Manage returned products',
      icon: '↩️',
      path: '/return',
    },
    {
      title: 'Suppliers',
      description: 'Manage supplier information',
      icon: '🚚',
      path: '/supplier',
    },
    {
      title: 'Reports',
      description: 'View business reports',
      icon: '📊',
      path: '/reports',
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Quick Bill Dashboard</h2>
        <p>Welcome! Select a feature to get started</p>
      </div>

      <div className="dashboard-feature-grid">
        {features.map((feature) => (
          <button
            type="button"
            className="dashboard-feature-card"
            key={feature.path}
            onClick={() => navigate(feature.path)}
          >
            <span className="feature-icon">
              {feature.icon}
            </span>

            <span className="feature-title">
              {feature.title}
            </span>

            <span className="feature-description">
              {feature.description}
            </span>

            <span className="feature-arrow">
              Explore →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;