
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import BackButton from './BackButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@gmail.com' && password === 'admin123') {
      localStorage.setItem('role', 'admin');
      navigate('/dashboard');
    } else if (
      email === 'staff@gmail.com' &&
      password === 'staff123'
    ) {
      localStorage.setItem('role', 'staff');
      navigate('/billing');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <BackButton/>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Quick Bill</h2>
        <p>Login to your account</p>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        
      </form>
    </div>
  );
};

export default Login;
