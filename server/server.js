
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const Product = require('./models/Product');
const Staff = require('./models/Staff');
const Supplier = require('./models/Supplier');
const Billing = require('./models/Billing');


app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/staff', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/staff', async (req, res) => {
  try {
    const newStaff = new Staff({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    });

    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/staff/:id', async (req, res) => {
  try {
    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);

    if (!deletedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/suppliers', async (req, res) => {
  try {
    const newSupplier = new Supplier({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      products: req.body.products
    });

    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/suppliers/:id', async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!deletedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.post('/api/billing', async (req, res) => {
  try {
    const {
      customer,
      productId,
      quantity,
      payment
    } = req.body;

    if (!customer || !productId || !payment) {
      return res.status(400).json({
        message: 'Please fill all fields'
      });
    }

    if (!['Cash', 'UPI', 'Card'].includes(payment)) {
      return res.status(400).json({
        message: 'Invalid payment method'
      });
    }

    const qty = Number(quantity);

    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({
        message: 'Quantity must be at least 1'
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    if (qty > product.quantity) {
      return res.status(400).json({
        message: 'Not enough stock available'
      });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: productId,
        quantity: { $gte: qty }
      },
      {
        $inc: { quantity: -qty }
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(400).json({
        message: 'Stock changed. Please try again.'
      });
    }

    try {
      const newBill = new Billing({
        customer: customer.trim(),
        productId: product._id,
        product: product.name,
        quantity: qty,
        price: product.price,
        payment,
        total: product.price * qty
      });

      const savedBill = await newBill.save();

      res.status(201).json({
        message: 'Bill generated successfully',
        bill: savedBill
      });
    } catch (error) {
      await Product.updateOne(
        { _id: productId },
        { $inc: { quantity: qty } }
      );
      throw error;
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Failed to generate bill'
    });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Correct server is running!' });
});
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Billing.find().sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    console.error('Transaction error:', error);

    res.status(500).json({
      message: 'Failed to fetch transactions'
    });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
  })
  .catch((error) => {
    console.log('MongoDB Connection Error:', error.message);
  });


app.get('/', (req, res) => {
  res.send('Quick Bill Backend is Running!');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
