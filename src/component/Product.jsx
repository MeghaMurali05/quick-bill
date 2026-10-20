
import React, { useState, useEffect } from 'react';
import '../css/Product.css';
import BackButton from './BackButton';

const API = 'https://quick-bill-jxuh.onrender.com/api';

function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`${API}/products`);

        if (!response.ok) {
          throw new Error('Unable to load products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log('Error fetching products:', error);
        setMessage('Unable to load products. Please try again.');
      }
    }

    loadProducts();
  }, []);

  async function addProduct() {
    setMessage('');

    if (
      !name.trim() ||
      !category.trim() ||
      price === '' ||
      stock === ''
    ) {
      setMessage('Please fill all fields.');
      return;
    }

    if (Number(price) <= 0 || Number(stock) < 0) {
      setMessage('Enter a valid price and stock quantity.');
      return;
    }

    try {
      const response = await fetch(`${API}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          category: category.trim(),
          price: Number(price),
          quantity: Number(stock),
        }),
      });

      const newProduct = await response.json();

      if (!response.ok) {
        setMessage(newProduct.message || 'Unable to add product.');
        return;
      }

      setProducts((previousProducts) => [
        ...previousProducts,
        newProduct,
      ]);

      setName('');
      setCategory('');
      setPrice('');
      setStock('');

      setMessage('Product added successfully.');
    } catch (error) {
      console.log('Error adding product:', error);
      setMessage('Unable to connect to server.');
    }
  }

  async function deleteProduct(id) {
    setMessage('');

    try {
      const response = await fetch(`${API}/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        setMessage('Unable to delete product.');
        return;
      }

      setProducts((previousProducts) =>
        previousProducts.filter((product) => product._id !== id)
      );

      setMessage('Product deleted successfully.');
    } catch (error) {
      console.log('Error deleting product:', error);
      setMessage('Unable to connect to server.');
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-container">
      <BackButton />

      <h2>Products</h2>
      <p>Manage your textile shop products</p>

      <div className="product-form">
        <h3>Add Product</h3>

        <div className="products-header">
          <input
            type="text"
            className="search-input"
            placeholder="Search product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="product-inputs">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            min="0"
            step="1"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <button
            type="button"
            className="add-product-btn"
            onClick={addProduct}
          >
            Add Product
          </button>
        </div>
      </div>

      {message && <p role="status">{message}</p>}

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  {search ? 'No matching products found.' : 'No products available.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;

