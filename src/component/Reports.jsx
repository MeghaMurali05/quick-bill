import React from 'react';
import '../css/Reports.css';
import BackButton from './BackButton';

function Reports() {
  const totalSales = 25000;
  const totalTransactions = 45;
  const productsSold = 32;
  const productsReturned = 1;

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

    link.href = URL.createObjectURL(file);
    link.download = 'SalesReport.txt';
    link.click();

    URL.revokeObjectURL(link.href);
  }

  return (
    <div className="reports-container">
      <BackButton/>
      <h2>Reports</h2>
      <p>View sales and business reports</p>

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

      <button className="report-btn" onClick={downloadReport}>
        Download Report
      </button>
    </div>
  );
}

export default Reports;