
const Products=require("../models/products")

const fetchProducts=async(req,res)=>{
    const products =await Products.find();
    res.json({products})
}

const fetchProductsById= async (req, res) => {
    try {
      const id = req.params.id;
      const products = await Products.findById(id);
  
      if (!products) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const addProducts=async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const images = req.file.filename;
    const userId = req.body.userId; 
    const newProduct = new Products({ title, description, price, images, userId });
    await newProduct.save();

    res.json({ product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
  }


  const updateProduct=async (req, res) => {
    try {
      const id = req.params.id;

      const { title, description, price, images } = req.body;
      const products = await Products.findByIdAndUpdate(id,{title, description, price, images } , {new: true })
  
      if (!products) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  const fetchProductsByUserId = async (req, res) => {
    try {
      const userId=  req.params.id;  // Assuming userId is passed as a route parameter
      // console.log('id is', userId)
  
      const products = await Products.find({ userId: userId });
  // console.log('test', products)
      res.json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const deleteProduct=async(req,res)=>{

    try{
    const id = req.params.id;

    const products=await Products.deleteOne({_id:id})

    res.json({sucess:"records deleted"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server error"})

    }
}
module.exports={fetchProducts,fetchProductsById,addProducts,updateProduct,deleteProduct,fetchProductsByUserId}