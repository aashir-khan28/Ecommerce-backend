const mongoose = require('mongoose');

const cartItemsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String, required: true },
  userId: { type: String, required: true },
});

const cartItems = mongoose.model('cartItems', cartItemsSchema);

module.exports = cartItems;