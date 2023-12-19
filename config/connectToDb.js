const mongoose=require("mongoose")
require("dotenv").config()
async function  connectToDb(){
    try{
 await mongoose.connect(process.env.DB_CONNECT)
 console.log("conected")
    }
    catch(error){
console.log(error)
    }
}

module.exports= connectToDb