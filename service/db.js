const mongoose=require("mongoose")

//connection string
mongoose.connect("mongodb://localhost:27017/bank_server",{useNewUrlParser:true})

//model creation, schema means fields and values
const User=mongoose.model("User",
{ 
    username: String, 
    acno: Number, 
    password: String,
    balance: Number, 
    transaction: [] 
}
)

module.exports={
    User
}