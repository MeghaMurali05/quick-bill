
import React, { useEffect, useState } from 'react';
import '../css/Reports.css';
import BackButton from './BackButton';

const API = 'https://quick-bill-jxuh.onrender.com/api';

function Reports() {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        const response = await fetch(`${API}/transactions`);

        if (!response.ok) {
          throw new Error('Unable to load transactions');
        }

        const data = await response.json();

        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading reports:', error);
        setMessage('Unable to load report data. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const totalSales = transactions.reduce(
    (total, transaction) =>
      total + Number(transaction.total || 0),
    0
  );

  const totalTransactions = transactions.length;

  const productsSold = transactions.reduce(
    (total, transaction) =>
      total + Number(transaction.quantity || 0),
    0
  );

  // Returns are not included because a returns API has not been verified.
  const productsReturned = 0;

  function downloadReport() {
    const report = `
Quick Bill - Sales Report

Total Sales: ₹${totalSales}
Total Transactions: ${totalTransactions}
Products Sold: ${productsSold}
Products Returned: ${productsReturned}
`;

    const file = new Blob([report], { type: 'text/plain' });
    const link = document.createElement('a');
    const fileURL = URL.createObjectURL(file);

    link.href = fileURL;
    link.download = 'SalesReport.txt';
    link.click();

    URL.revokeObjectURL(fileURL);
  }

  return (
    <div className="reports-container">
      <BackButton />

      <h2>Reports</h2>
      <p>View sales and business reports</p>

      {loading && <p>Loading report data...</p>}

      {message && (
        <p role="alert">{message}</p>
      )}

      {!loading && !message && (
        <>
          <div className="reports-cards">
            <div className="report-card">
              <h3>Total Sales</h3>
              <p>₹{totalSales.toLocaleString('en-IN')}</p>
            </div>

            <div className="report-card">
              <h3>Total Transactions</h3>
              <p>{totalTransactions}</p>
            </div>

            <div className="report-card">
              <h3>Products Sold</h3>
              <p>{productsSold}</p>
            </div>

            <div className="report-card">
              <h3>Products Returned</h3>
              <p>{productsReturned}</p>
            </div>
          </div>

          <button
            type="button"
            className="report-btn"
            onClick={downloadReport}
          >
            Download Report
          </button>
        </>
      )}
    </div>
  );
}

export default Reports;

