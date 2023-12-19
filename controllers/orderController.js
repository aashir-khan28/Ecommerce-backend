const Order = require('../models/Order');

const placeOrder = async (req, res) => {
  try {
    // Extract cart items from the request body
    const { cartItems } = req.body;

    // Save the order to the database
    const order = await Order.create({ cartItems });

    res.status(201).json({ order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { placeOrder };