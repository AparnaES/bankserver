//import express and store in a variable
const exp=require("express")

//import dataservice
const ds=require('./service/dataservice')

//import jswt
const jwt=require("jsonwebtoken") 

//app creation
const app=exp()

//all date from server converts from json to js
app.use(exp.json())

//middle ware creation
const jwtMiddleware=(req,res,next)=>{
   try {// access dta form request body
    // const token=req.body.token
    const token=req.headers['access_token']


    //verify the token with secret key
    const data=jwt.verify(token,"userkey")

    // console.log(data);

    next()
}
 catch{
    res.status(422).json({
        
            status:false,
            message:"Please login",
            statusCode:404
        
    })
}
}

//register -post

app.post("/register",(req,res)=>{
    // console.log(req.body);
    // res.send("Working")
   const result= ds.register(req.body.acno,req.body.uname,req.body.psw)
   res.status(result.statusCode).json(result)
//    if (result) {
//     res.send("Registred")
//     console.log(ds.userDetails);
//    } else {
//     res.send("User already exists")
//    }
})
//login  -get/post

app.post("/login",(req,res)=>{
    const result= ds.login(req.body.acno,req.body.psw)
    res.status(result.statusCode).json(result)
 
})
//deposit withdrew -patch /post
app.post("/deposit",jwtMiddleware,(req,res)=>{
    const result= ds.deposit(req.body.acno,req.body.psw,req.body.amount)
    res.status(result.statusCode).json(result)
 
})
app.post("/withdraw",jwtMiddleware,(req,res)=>{
    const result= ds.Withdraw(req.body.acno,req.body.psw,req.body.amount)
    res.status(result.statusCode).json(result)
 
})

//transaction -get
app.get("/transaction",jwtMiddleware,(req,res)=>{
    const result= ds.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result)
 
})
//delete-delete

//resolve api checking

// app.get("/",(req,res)=>{
//     res.send("GET method working.......")
// })

// app.post("/",(req,res)=>{
//     res.send("POST method working.......")
// })
// app.patch("/",(req,res)=>{
//     res.send("PATCH method working.......")
// })
// app.put("/",(req,res)=>{
//     res.send("PUT method working.......")
// })
// app.delete("/",(req,res)=>{
//     res.send("DELETE method working.......")
// })
//port sett for running app
app.listen(3000,()=>{
    console.log("server starts at port 3000");
})