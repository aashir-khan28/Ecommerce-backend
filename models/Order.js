const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: String,
  userId: String,
});

const orderSchema = new mongoose.Schema({
  cartItems: [cartItemSchema],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;