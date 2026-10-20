import React, { useState, useEffect } from 'react';
import '../css/Transaction.css';
import BackButton from './BackButton';

const API = 'https://quick-bill-jxuh.onrender.com/api';

function Transaction() {
const [transactions, setTransactions] = useState([]);
const [search, setSearch] = useState('');
const [date, setDate] = useState('');
const [payment, setPayment] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
fetchTransactions();
}, []);

async function fetchTransactions() {
try {
const response = await fetch(`${API}/transactions`);
const data = await response.json();


  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch transactions');
  }

  setTransactions(data);
} catch (err) {
  console.log('Transaction error:', err);
  setError('Unable to load transactions');
} finally {
  setLoading(false);
}


}

const filteredTransactions = transactions.filter((item) => {
const billNo = String(item._id || item.id || '');
const transactionDate = item.createdAt
? new Date(item.createdAt).toLocaleDateString('en-CA')
: '';


return (
  billNo.toLowerCase().includes(search.toLowerCase()) &&
  (date === '' || transactionDate === date) &&
  (payment === '' || item.payment === payment)
);


});

return ( <div className="transcations-container"> <BackButton />

```
  <h2>Transactions</h2>
  <p>View all billing transactions</p>

  <div className="transactions-header">
    <input
      type="text"
      placeholder="Search bill number"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />

    <select
      value={payment}
      onChange={(e) => setPayment(e.target.value)}
    >
      <option value="">All Payments</option>
      <option value="Cash">Cash</option>
      <option value="UPI">UPI</option>
      <option value="Card">Card</option>
    </select>
  </div>

  <div className="transactions-table">
    <table>
      <thead>
        <tr>
          <th>Bill No</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Payment</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan="6">Loading transactions...</td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan="6">{error}</td>
          </tr>
        ) : filteredTransactions.length === 0 ? (
          <tr>
            <td colSpan="6">No transactions found</td>
          </tr>
        ) : (
          filteredTransactions.map((item) => (
            <tr key={item._id || item.id}>
              <td>
                {item._id
                  ? item._id.slice(-6).toUpperCase()
                  : item.id}
              </td>

              <td>{item.customer}</td>

              <td>
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString('en-IN')
                  : '-'}
              </td>

              <td>
                ₹{Number(item.total || 0).toLocaleString('en-IN')}
              </td>

              <td>{item.payment}</td>

              <td>
                <span className="status-paid">Paid</span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>


);
}

export default Transaction;
