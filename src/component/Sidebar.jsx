
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = ({ onNavigate }) => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('role');

    if (onNavigate) {
      onNavigate();
    }

    navigate('/');
  }

  return (
    <div className="sidebar">
      <h2>Quick Bill</h2>

      <nav>
        <NavLink
          to="/dashboard"
          onClick={onNavigate}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/product"
          onClick={onNavigate}
        >
          Product
        </NavLink>

        <NavLink
          to="/staff"
          onClick={onNavigate}
        >
          Staff
        </NavLink>

        <NavLink
          to="/billing"
          onClick={onNavigate}
        >
          Billing
        </NavLink>

        <NavLink
          to="/transaction"
          onClick={onNavigate}
        >
          Transaction
        </NavLink>

        <NavLink
          to="/return"
          onClick={onNavigate}
        >
          Return
        </NavLink>

        <NavLink
          to="/supplier"
          onClick={onNavigate}
        >
          Supplier
        </NavLink>

        <NavLink
          to="/reports"
          onClick={onNavigate}
        >
          Reports
        </NavLink>
      </nav>

      <button
        type="button"
        className="logout-link"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

