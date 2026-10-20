import React, { useEffect, useState } from 'react';
import '../css/Billing.css';
import BackButton from './BackButton';

const API = 'https://quick-bill-jxuh.onrender.com/api';

function Billing() {
  const [customer, setCustomer] = useState('');
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment] = useState('');
  const [bill, setBill] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadProducts() {
    try {
      const response = await fetch(`${API}/products`);
      if (!response.ok) throw new Error();
      const data = await response.json();
      setProducts(data);
    } catch {
      setMessage('Products not loaded successfully');
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const selectedProduct = products.find(
    (item) => item._id === productId
  );

  const total = selectedProduct
    ? Number(selectedProduct.price) * Number(quantity)
    : 0;

  async function generateBill() {
    setMessage('');
    setBill(null);

    if (!customer.trim() || !selectedProduct || !payment) {
      setMessage('Please fill all fields.');
      return;
    }

    const qty = Number(quantity);

    if (!Number.isInteger(qty) || qty < 1) {
      setMessage('Enter a valid quantity.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/billing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: customer.trim(),
          productId,
          quantity: qty,
          payment
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Bill generation failed.');
      }

      setBill(data.bill);
      setMessage('Bill generated successfully!');
      await loadProducts();
    } catch (error) {
      setMessage(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="billing-container">
      <BackButton />
      <h2>Billing</h2>
      <p>Create a new customer bill</p>

      <div className="billing-form">
        <label>Customer Name</label>
        <input
          type="text"
          placeholder="Enter customer name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <label>Product</label>
        <select
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
            setBill(null);
          }}
        >
          <option value="">Select Product</option>
          {products.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name} - ₹{item.price} (Stock: {item.quantity})
            </option>
          ))}
        </select>

        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            setBill(null);
          }}
        />

        <label>Payment Method</label>
        <select
          value={payment}
          onChange={(e) => {
            setPayment(e.target.value);
            setBill(null);
          }}
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>

        <h3>Total Amount: ₹{total.toFixed(2)}</h3>

        <button
          type="button"
          className="generate-bill-btn"
          onClick={generateBill}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Generate Bill'}
        </button>
      </div>

      {message && <p role="status">{message}</p>}

      {bill && (
        <div className="bill-details">
          <h3>Bill Details</h3>
          <p>Customer: {bill.customer}</p>
          <p>Product: {bill.product}</p>
          <p>Quantity: {bill.quantity}</p>
          <p>Payment: {bill.payment}</p>
          <h3>Total Amount: ₹{bill.total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}

export default Billing;