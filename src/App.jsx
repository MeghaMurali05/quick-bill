
  import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Billing from './component/Billing';
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import Product from './component/Product';
import Reports from './component/Reports';
import Return from './component/Return';
import Staff from './component/Staff';
import Supplier from './component/Supplier';
import Transaction from './component/Transaction';
import Sidebar from './component/Sidebar';
import Home from './component/Home';

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={<Layout><Dashboard /></Layout>}
        />

        <Route
          path="/product"
          element={<Layout><Product /></Layout>}
        />

        <Route
          path="/staff"
          element={<Layout><Staff /></Layout>}
        />

        <Route
          path="/billing"
          element={<Layout><Billing /></Layout>}
        />

        <Route
          path="/transaction"
          element={<Layout><Transaction /></Layout>}
        />

        <Route
          path="/return"
          element={<Layout><Return /></Layout>}
        />

        <Route
          path="/supplier"
          element={<Layout><Supplier /></Layout>}
        />

        <Route
          path="/reports"
          element={<Layout><Reports /></Layout>}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;