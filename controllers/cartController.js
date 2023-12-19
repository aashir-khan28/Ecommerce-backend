const CartItems=require("../models/cartItems")

const fetchCartItems=async (req, res) => {
 
    try {
      const { title, description, price, images , userId } = req.body;
  
      const cart  = await CartItems.create({ title, description, price, images, userId});
  
      res.json({ cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
 


  const fetchCartItemsByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      const cartItems = await CartItems.find({ userId });
  
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ error: 'Cart items not found for the given userId' });
      }
  
      res.json({ cartItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  
  module.exports = {fetchCartItems,fetchCartItemsByUserId}