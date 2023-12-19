const express=require("express")
require("dotenv").config()
const cookieParser = require('cookie-parser')
const connectTodb=require("./config/connectToDb")
const Products=require("./models/products")
const productController=require("./controllers/productController")
const requireAuth = require("./middleware/requireAuth")
const userscontroller=require("./controllers/usersController")
const cartController=require("./controllers/cartController")
const orderController=require("./controllers/orderController")
const multer = require("multer");
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });

  const path = require("path");
//create express app
const app=express();
const cors=require("cors")

app.use(express.static("public"));
//configure express app
app.use(express.json())
app.use(cors({
    origin:true,
    credentials:true
}

))
app.use(cookieParser())
//connect to db
connectTodb();


// Routing
app.post("/signup",userscontroller.signup)

app.post("/login",userscontroller.login)

app.get("/logout",userscontroller.logout)

app.get("/check-auth", requireAuth,userscontroller.checkAuth )

app.get("/products",productController.fetchProducts)

app.get('/products/:id',productController.fetchProductsById);

 app.post('/products', upload.single("images"),productController.addProducts);

app.put('/products/:id',productController.updateProduct);

app.delete("/products/:id",productController.deleteProduct)

app.get('/prodbyid/:id',productController.fetchProductsByUserId);

app.post("/cartItems",cartController.fetchCartItems)

app.get("/cartItemsById/:userId",cartController.fetchCartItemsByUserId)


app.post('/order', orderController.placeOrder);


//start our server
app.listen(process.env.PORT)