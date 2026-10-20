
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
      reason: 'Size Issue',
    },
  ]);

  const [search, setSearch] = useState('');
  const [customer, setCustomer] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  function addReturn(e) {
    e.preventDefault();
    setMessage('');

    if (
      !customer.trim() ||
      !product.trim() ||
      !quantity ||
      !amount ||
      !reason.trim()
    ) {
      setMessage('Please fill all fields.');
      return;
    }

    const returnQuantity = Number(quantity);
    const refundAmount = Number(amount);

    if (
      !Number.isInteger(returnQuantity) ||
      returnQuantity < 1 ||
      refundAmount <= 0
    ) {
      setMessage('Enter a valid quantity and refund amount.');
      return;
    }

    const newReturn = {
      id: `R${String(returns.length + 1).padStart(3, '0')}`,
      customer: customer.trim(),
      product: product.trim(),
      quantity: returnQuantity,
      amount: refundAmount,
      reason: reason.trim(),
    };

    setReturns((previousReturns) => [
      ...previousReturns,
      newReturn,
    ]);

    setCustomer('');
    setProduct('');
    setQuantity('');
    setAmount('');
    setReason('');
    setShowForm(false);
    setMessage('Return added successfully.');
  }

  const filteredReturns = returns.filter((item) =>
    item.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="return-container">
      <BackButton />

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
          type="button"
          className="add-return-btn"
          onClick={() => {
            setShowForm(!showForm);
            setMessage('');
          }}
        >
          {showForm ? 'Cancel' : '+ Add Return'}
        </button>
      </div>

      {message && <p role="status">{message}</p>}

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
            step="1"
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
            {filteredReturns.length > 0 ? (
              filteredReturns.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.customer}</td>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.reason}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No returns found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Return;

