import React, { useState, useEffect } from 'react';
import '../css/Staff.css';
import BackButton from './BackButton';

function Staff() {
  const [staff, setStaff] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/staff')
      .then((response) => response.json())
      .then((data) => setStaff(data))
      .catch((error) => console.log('Error fetching staff:', error));
  }, []);


  async function addStaff(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          role: role
        })
      });

      const newStaff = await response.json();

      if (!response.ok) {
        alert(newStaff.message || 'Unable to save staff');
        return;
      }

      setStaff([...staff, newStaff]);

      setName('');
      setEmail('');
      setRole('');
    } catch (error) {
      console.log('Error adding staff:', error);
      alert('Unable to connect to server');
    }
  }

 
  async function deleteStaff(id) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/staff/${id}`,
        {
          method: 'DELETE'
        }
      );

      if (!response.ok) {
        alert('Unable to delete staff');
        return;
      }

      setStaff(staff.filter((person) => person._id !== id));
    } catch (error) {
      console.log('Error deleting staff:', error);
      alert('Unable to connect to server');
    }
  }

  return (
    <div className="staff-container">
      <BackButton/>
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
            {staff.map((person, index) => (
              <tr key={person._id}>
                <td>S{String(index + 1).padStart(3, '0')}</td>
                <td>{person.name}</td>
                <td>{person.email}</td>
                <td>{person.role}</td>
                <td>
                  <button
                    className="delete-staff-btn"
                    onClick={() => deleteStaff(person._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staff;