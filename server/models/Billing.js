
const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    product: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    payment: {
      type: String,
      required: true,
      enum: ['Cash', 'UPI', 'Card']
    },
    total: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Billing', billingSchema);
