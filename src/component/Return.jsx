import React, { useState } from 'react';
import '../css/Return.css';
import BackButton from './BackButton';

function Return() {
  const [returns, setReturns] = useState([
    {
      id: 'R001',
      customer: 'Neha Thomas',
      product: 'Cotton Shirt',
      quantity: 1,
      amount: 800,
      reason: 'Size Issue'
    }
  ]);

  const [search, setSearch] = useState('');
  const [customer, setCustomer] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [showForm, setShowForm] = useState(false);

  function addReturn(e) {
    e.preventDefault();

    const newReturn = {
      id: 'R00' + (returns.length + 1),
      customer: customer,
      product: product,
      quantity: Number(quantity),
      amount: Number(amount),
      reason: reason
    };

    setReturns([...returns, newReturn]);

    setCustomer('');
    setProduct('');
    setQuantity('');
    setAmount('');
    setReason('');
    setShowForm(false);
  }

  return (
    <div className="return-container">
      <BackButton/>
      <h2>Product Returns</h2>
      <p>Manage returned products and refunds</p>

      <div className="returns-header">
        <input
          type="text"
          placeholder="Search return ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="add-return-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Return
        </button>
      </div>

      {showForm && (
        <form onSubmit={addReturn}>
          <input
            type="text"
            placeholder="Customer Name"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Product Name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Refund Amount"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Return Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          <button type="submit">Save Return</button>
        </form>
      )}

      <div className="returns-table">
        <table>
          <thead>
            <tr>
              <th>Return ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Reason</th>
            </tr>
          </thead>

          <tbody>
            {returns
              .filter(function(item) {
                return item.id.toLowerCase().includes(search.toLowerCase());
              })
              .map(function(item) {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.customer}</td>
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.amount}</td>
                    <td>{item.reason}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Return;