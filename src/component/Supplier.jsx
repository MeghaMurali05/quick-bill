import React, { useState, useEffect } from 'react';
import '../css/Supplier.css';
import BackButton from './BackButton';

function Supplier() {
  const [suppliers, setSuppliers] = useState([]);

  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [products, setProducts] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Get suppliers from MongoDB
  useEffect(() => {
    fetch('http://localhost:8000/api/suppliers')
      .then((response) => response.json())
      .then((data) => setSuppliers(data))
      .catch((error) => console.log('Error fetching suppliers:', error));
  }, []);

  // Add supplier
  async function addSupplier(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          address: address,
          products: products
        })
      });

      const newSupplier = await response.json();

      if (!response.ok) {
        alert(newSupplier.message || 'Unable to save supplier');
        return;
      }

      setSuppliers([...suppliers, newSupplier]);

      setName('');
      setPhone('');
      setAddress('');
      setProducts('');
      setShowForm(false);
    } catch (error) {
      console.log('Error adding supplier:', error);
      alert('Unable to connect to server');
    }
  }

  // Delete supplier
  async function deleteSupplier(id) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/suppliers/${id}`,
        {
          method: 'DELETE'
        }
      );

      if (!response.ok) {
        alert('Unable to delete supplier');
        return;
      }

      setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
    } catch (error) {
      console.log('Error deleting supplier:', error);
      alert('Unable to connect to server');
    }
  }

  return (
    <div className="suppliers-container">
      <BackButton/>
      <h2>Suppliers</h2>
      <p>Manage your product suppliers</p>

      <div className="suppliers-header">
        <input
          type="text"
          placeholder="Search supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="add-supplier-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Supplier
        </button>
      </div>

      {showForm && (
        <form onSubmit={addSupplier}>
          <input
            type="text"
            placeholder="Supplier Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Products Supplied"
            value={products}
            onChange={(e) => setProducts(e.target.value)}
            required
          />

          <button type="submit">Save Supplier</button>
        </form>
      )}

      <div className="suppliers-table">
        <table>
          <thead>
            <tr>
              <th>Supplier ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Products Supplied</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {suppliers
              .filter((supplier) =>
                supplier.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((supplier, index) => (
                <tr key={supplier._id}>
                  <td>SUP{String(index + 1).padStart(3, '0')}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.products}</td>
                  <td>
                    <button onClick={() => deleteSupplier(supplier._id)}>
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

export default Supplier;