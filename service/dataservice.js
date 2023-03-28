const jwt=require("jsonwebtoken")

userDetails = {
    1000: { username: "anu", acno: 1000, password: "abc123", balance: 0, transaction: [] },
    1001: { username: "manu", acno: 1001, password: "def123", balance: 0, transaction: [] },
    1002: { username: "jinu", acno: 1002, password: "ghi123", balance: 0, transaction: [] },
    1003: { username: "sanu", acno: 1003, password: "jkl123", balance: 0, transaction: [] }

}
//change as funtion or arrow funtion
register = (acno, uname, psw) => {
    if (acno in userDetails) {
        return {
            status:false,
            message:"user already present",
            statusCode:404
        }
    } else {
        userDetails[acno] = { username: uname, acno, password: psw, balance: 0, transaction: [] }
        //   console.log(userDetails);
        return  {
            status:true,
            message:"Registered",
            statusCode:200
        }
    }
}
login =(acno, psword) =>{
    if (acno in userDetails) {
      if (psword == userDetails[acno]["password"]) {
        //store username if loginsucces
        currentUser = userDetails[acno]["username"]
        currentAcnum = acno

        //create token               //secret key
        const token=jwt.sign({acno},"userkey")


        return  {
            status:true,
            message:"Login success",
            statusCode:200,
            currentUser,
            currentAcnum,
            token
        }
      } else {
        return {
            status:false,
            message:"Password incorrect",
            statusCode:404
        }
      }
    } else {
      return {
        status:false,
        message:"Not registered yet",
        statusCode:404
    }
    }

  }
  deposit=(acno, pwd, amt)=> {
    //to convert amount int
    var amount = parseInt(amt)
    if (acno in userDetails) {
      if (pwd == userDetails[acno]["password"]) {
        userDetails[acno]["balance"] += amount

        //add tranaction data
        userDetails[acno]["transaction"].push(
          {
            Type: "Credit",
            Amount: amount
          }
        )
        return{
            status:true,
            message:`Your Account have been credited with amount ${amount} And The Available Balance is ${userDetails[acno]["balance"]}`,
            statusCode:200
        }
            
         
      } else {
        return {
            status:false,
            message:"Password incorrect",
            statusCode:404
        }
      }
    } else {
      return {
        status:false,
        message:"Account number incorrect",
        statusCode:404
    }
    }
  }
  Withdraw=(acno, psw, wamt) =>{
    var amount = parseInt(wamt)
    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        if (amount <= userDetails[acno]["balance"]) {
          userDetails[acno]["balance"] -= amount
          // console.log(userDetails);
          userDetails[acno]["transaction"].push(
            {
              Type: "Debit",
              Amount: amount
            }
          )
          // console.log(userDetails);
       return {
        status:true,
        message:`Your Account have been Debited with amount ${amount} And The Available Balance is ${userDetails[acno]["balance"]}`,
        statusCode:200
    }
    //    userDetails[acno2]["balance"] `Your Account have been Debited with amount ${amt} And The Available Balance is ${result}`

        } else {
            return {
                status:false,
                message:"Insufficient balance",
                statusCode:404
            }
        //   ("Insufficient balance")
        }

      }
      else {
        return {
            status:false,
            message:"Password incorrect",
            statusCode:404
        }
      }

    }
    else {
      return {
        status:false,
        message:"Account number incorrect",
        statusCode:404
    }
    }

  }
  getTransaction=(acno)=> {
    return {
      status:true,
      transaction:userDetails[acno].transaction,
      statusCode:200
  }

  }

//export which want to import
module.exports={
    register,login,deposit,Withdraw,getTransaction
}