//import express and store in a variable
const exp=require("express")

//import cors
const cors=require("cors")

//import dataservice
const ds=require('./service/dataservice')

//import jswt
const jwt=require("jsonwebtoken") 

//app creation
const app=exp()

//integrate app with frontend
app.use(cors({origin:'http://localhost:4200'}))

//all date from server converts from json to js
app.use(exp.json())

//middle ware creation
const jwtMiddleware=(req,res,next)=>{
   try {// access data form request body
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
    ds.register(req.body.acno,req.body.uname,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


//login  -get/post

app.post("/login",(req,res)=>{
    ds.login(req.body.acno,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
 
})
//deposit withdrew -patch /post
app.post("/deposit",jwtMiddleware,(req,res)=>{
    ds.deposit(req.body.acno,req.body.psw,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
    })
 
})
app.post("/withdraw",jwtMiddleware,(req,res)=>{
    ds.Withdraw(req.body.acno,req.body.psw,req.body.amount).then(result=>{
        res.status(result.statusCode).json(result)
    })
 
})

//transaction -get
app.post("/transaction",jwtMiddleware,(req,res)=>{
    ds.getTransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
 
})
//delete-delete
app.delete("/delete/:acno",jwtMiddleware,(req,res)=>{
    //delete acno send as  params
    ds.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.listen(3000,()=>{
    console.log("server starts at port 3000");
})





//    if (result) {
//     res.send("Registred")
//     console.log(ds.userDetails);
//    } else {
//     res.send("User already exists")
//    }
// console.log(req.body);
    // res.send("Working")
//    const result= ds.register(req.body.acno,req.body.uname,req.body.psw)
// res.status(result.statusCode).json(result)

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