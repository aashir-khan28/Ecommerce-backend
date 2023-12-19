
const mongoose=require("mongoose")
const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
 
  images: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});
 

  const products = mongoose.model('products', productsSchema);

module.exports=products;