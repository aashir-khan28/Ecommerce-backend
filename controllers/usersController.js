const User=require("../models/user")

const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")


async function signup(req,res){
    try{
    const {email,password,addresses,role}=req.body
    console.log('abc',req.body)
    //HASH Password
    const hashPassword =bcrypt.hashSync(password,8)
    await User.create({email,password:hashPassword,addresses,role})

    res.sendStatus(200)
    }
    catch(err){``
        console.log(err)
        res.sendStatus(400).json(err)

    }
}


async function login(req, res) {
    // Get the email, role, and password from the request body
    const { email, role, password } = req.body;
  
    // Find the user with the requested email and role
    const user = await User.findOne({ email, role });
  
    // If the user is not found, return a 401 status
    if (!user) {
      return res.sendStatus(401);
    }
  
    // Compare the sent password with the found user password hash
    const passwordMatch = bcrypt.compareSync(password, user.password);
  
    // If the password doesn't match, return a 401 status
    if (!passwordMatch) {
      return res.sendStatus(401);
    }
  
    // Create a JWT token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);
  
    // Set the cookie
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  
    // Return the user ID in the response
    res.status(200).json({ userId: user._id });
  }
function logout(req,res){
    res.clearCookie("Authorization")
    res.sendStatus(200)

}

function checkAuth(req,res){
    console.log(req.user)
    res.sendStatus(200)
}
module.exports={
    signup,
    login,
    logout,
    checkAuth
}

