
import React, { useState, useEffect } from 'react';
import '../css/Supplier.css';
import BackButton from './BackButton';

const API = 'https://quick-bill-jxuh.onrender.com/api';

function Supplier() {
const [suppliers, setSuppliers] = useState([]);
const [search, setSearch] = useState('');
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const [products, setProducts] = useState('');
const [showForm, setShowForm] = useState(false);

// Fetch suppliers
useEffect(() => {
fetch(`${API}/suppliers`)
.then((response) => response.json())
.then((data) => setSuppliers(data))
.catch((error) => console.log(error));
}, []);

// Add supplier
async function addSupplier(e) {
e.preventDefault();

try {
  const response = await fetch(`${API}/suppliers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, phone, address, products })
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.message || 'Unable to save supplier');
    return;
  }

  setSuppliers([...suppliers, data]);
  setName('');
  setPhone('');
  setAddress('');
  setProducts('');
  setShowForm(false);
} catch (error) {
  console.log(error);
  alert('Unable to connect to server');
}


}

// Delete supplier
async function deleteSupplier(id) {
try {
const response = await fetch(`${API}/suppliers/${id}`, {
method: 'DELETE'
});


  if (response.ok) {
    setSuppliers(
      suppliers.filter((supplier) => supplier._id !== id)
    );
  } else {
    alert('Unable to delete supplier');
  }
} catch (error) {
  console.log(error);
  alert('Unable to connect to server');
}


}

return ( <div className="suppliers-container"> <BackButton />


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
