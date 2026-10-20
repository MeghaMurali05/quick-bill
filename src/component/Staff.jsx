
import React, { useState, useEffect } from 'react';
import '../css/Staff.css';
import BackButton from './BackButton';

const API = 'https://quick-bill-jxuh.onrender.com/api';

function Staff() {
  const [staff, setStaff] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStaff() {
      try {
        const response = await fetch(`${API}/staff`);

        if (!response.ok) {
          throw new Error('Unable to load staff details');
        }

        const data = await response.json();
        setStaff(data);
      } catch (error) {
        console.error('Error fetching staff:', error);
        setMessage('Unable to load staff details. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadStaff();
  }, []);

  async function addStaff(e) {
    e.preventDefault();
    setMessage('');

    if (!name.trim() || !email.trim() || !role) {
      setMessage('Please fill all fields.');
      return;
    }

    try {
      const response = await fetch(`${API}/staff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role,
        }),
      });

      const newStaff = await response.json();

      if (!response.ok) {
        setMessage(newStaff.message || 'Unable to save staff.');
        return;
      }

      setStaff((previousStaff) => [...previousStaff, newStaff]);

      setName('');
      setEmail('');
      setRole('');
      setMessage('Staff added successfully.');
    } catch (error) {
      console.error('Error adding staff:', error);
      setMessage('Unable to connect to server.');
    }
  }

  async function deleteStaff(id) {
    setMessage('');

    try {
      const response = await fetch(`${API}/staff/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        setMessage('Unable to delete staff.');
        return;
      }

      setStaff((previousStaff) =>
        previousStaff.filter((person) => person._id !== id)
      );

      setMessage('Staff deleted successfully.');
    } catch (error) {
      console.error('Error deleting staff:', error);
      setMessage('Unable to connect to server.');
    }
  }

  return (
    <div className="staff-container">
      <BackButton />

      <h2>Staff Management</h2>
      <p>Manage your store employees</p>

      <h3>Add Staff</h3>

      <form className="staff-form" onSubmit={addStaff}>
        <input
          type="text"
          placeholder="Staff Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Cashier">Cashier</option>
          <option value="Sales Staff">Sales Staff</option>
        </select>

        <button type="submit" className="save-staff-btn">
          Save Staff
        </button>
      </form>

      {message && <p role="status">{message}</p>}

      <h3>Staff Details</h3>

      <div className="staff-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading staff details...</td>
              </tr>
            ) : staff.length > 0 ? (
              staff.map((person, index) => (
                <tr key={person._id}>
                  <td>S{String(index + 1).padStart(3, '0')}</td>
                  <td>{person.name}</td>
                  <td>{person.email}</td>
                  <td>{person.role}</td>
                  <td>
                    <button
                      type="button"
                      className="delete-staff-btn"
                      onClick={() => deleteStaff(person._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No staff details available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staff;

