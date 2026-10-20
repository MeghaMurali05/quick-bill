import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';
import BackButton from './BackButton';

const Sidebar = ({ onNavigate }) => {
  return (
    <div className="sidebar">
      <BackButton/>
      <h2>Quick Bill</h2>

      <nav>
        <NavLink to="/dashboard" onClick={onNavigate}>
          Dashboard
        </NavLink>

        <NavLink to="/product" onClick={onNavigate}>
          Product
        </NavLink>

        <NavLink to="/staff" onClick={onNavigate}>
          Staff
        </NavLink>

        <NavLink to="/billing" onClick={onNavigate}>
          Billing
        </NavLink>

        <NavLink to="/transaction" onClick={onNavigate}>
          Transaction
        </NavLink>

        <NavLink to="/return" onClick={onNavigate}>
          Return
        </NavLink>

        <NavLink to="/supplier" onClick={onNavigate}>
          Supplier
        </NavLink>

        <NavLink to="/reports" onClick={onNavigate}>
          Reports
        </NavLink>
      </nav>

      <NavLink
        to="/"
        className="logout-link"
        onClick={onNavigate}
      >
        Logout
      </NavLink>
    </div>
  );
};

export default Sidebar;