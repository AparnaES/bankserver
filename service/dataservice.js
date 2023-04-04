const jwt = require("jsonwebtoken")
//import db file
const db = require('./db')

// userDetails = {
//   1000: { username: "anu", acno: 1000, password: "abc123", balance: 0, transaction: [] },
//   1001: { username: "manu", acno: 1001, password: "def123", balance: 0, transaction: [] },
//   1002: { username: "jinu", acno: 1002, password: "ghi123", balance: 0, transaction: [] },
//   1003: { username: "sanu", acno: 1003, password: "jkl123", balance: 0, transaction: [] }

// }
//change as funtion or arrow funtion
register = (acno, uname, psw) => {
  //key and value are same{acno(keyindb):acno(value by user arr)}
  //return for get output of the method to who ever use the function.
  return db.User.findOne({ acno }).then(user => {
    //resolved output of findOne is stored in user.
    //if acno present in db then get the object in user, or get null response.
    if (user) {
      return {
        status: false,
        message: "user already present",
        statusCode: 404
      }
    } else {
      //newuser is added to database
      newUser = new db.User({
        username: uname,
        acno,
        password: psw,
        balance: 0,
        transaction: []
      })
      //to save the changes in db
      newUser.save()
      return {
        status: true,
        message: "Registered",
        statusCode: 200
      }
    }
  })
}
login = (acno, psword) => {
  //find can add to keyvalues it retrun object
  return db.User.findOne({ acno, password: psword }).then(user => {
    if (user) {
      currentUser = user.username   //accessed from userobject
      currentAcnum = acno    //already availabele
      const token = jwt.sign({ acno }, "userkey") //token generate
      return {
        status: true,
        message: "Login success",
        statusCode: 200,
        currentUser,
        currentAcnum,
        token
      }
    } else {
      return {
        status: false,
        message: "Incorrect Account number or Password ",
        statusCode: 404
      }
    }
  })
}

deposit = (acno, pwd, amt) => {
  //to convert amount int
  var amount = parseInt(amt)
  return db.User.findOne({ acno, password: pwd }).then(user => {
    if (user) {
      user.balance += amount
      user.transaction.push({ Type: "Credit", Amount: amount })
      user.save()  //save in db
      return {
        status: true,
        message: `Your Account have been credited with amount ${amount} And The Available Balance is ${user.balance}`,
        statusCode: 200
      }
    } else {
      return {
        status: false,
        message: " Incorrect Account number or Password",
        statusCode: 404
      }

    }
  })

}

Withdraw = (acno, psw, wamt) => {
  var amount = parseInt(wamt)
  return db.User.findOne({ acno, password: psw }).then(user => {
    if (user) {
      if (amount <= user.balance) {
        user.balance -= amount
        user.transaction.push({
          Type: "Debit",
          Amount: amount
        })
        user.save()
        return {
          status: true,
          message: `Your Account have been Debited with amount ${amount} And The Available Balance is ${user.balance}`,
          statusCode: 200
        }
      } else {
        return {
          status: false,
          message: "Insufficient balance",
          statusCode: 404
        }
      }
    } else {
      return {
        status: false,
        message: " Incorrect Account number or Password",
        statusCode: 404
      }
    }
  })
}
  


getTransaction = (acno) => {
 return db.User.findOne({acno}).then(user=>{
    if (user) {
      return {
        status: true,
        transaction: user.transaction,
        statusCode: 200
      }
    }
  })
  

}
deleteAcc=(acno)=>{
  return db.User.deleteOne({acno}).then(user=>{
    if (user) {
      return {
        status: true,
        messgae: "account deteted",
        statusCode: 200
      }
    } else {
      return {
        status: false,
        messgae: "account not present",
        statusCode: 402
      }
    }
  })
}


//export which want to import
module.exports = {
  register, login, deposit, Withdraw, getTransaction,deleteAcc
}


// if (acno in userDetails) {
//   if (psword == userDetails[acno]["password"]) {
//     //store username if loginsucces
//     currentUser = userDetails[acno]["username"]
//     currentAcnum = acno

//     //create token               //secret key
//     const token = jwt.sign({ acno }, "userkey")


//     return {
//       status: true,
//       message: "Login success",
//       statusCode: 200,
//       currentUser,
//       currentAcnum,
//       token
//     }
//   } else {
//     return {
//       status: false,
//       message: "Password incorrect",
//       statusCode: 404
//     }
//   }
// } else {
//   return {
//     status: false,
//     message: "Not registered yet",
//     statusCode: 404
//   }
// }
// return {
//   status: true,
//   transaction: userDetails[acno].transaction,
//   statusCode: 200
// }
// if (acno in userDetails) {
  //   if (psw == userDetails[acno]["password"]) {
  //     if (amount <= userDetails[acno]["balance"]) {
  //       userDetails[acno]["balance"] -= amount
  //       // console.log(userDetails);
  //       userDetails[acno]["transaction"].push(
  //         {
  //           Type: "Debit",
  //           Amount: amount
  //         }
  //       )
  //       // console.log(userDetails);
  //       return {
  //         status: true,
  //         message: `Your Account have been Debited with amount ${amount} And The Available Balance is ${userDetails[acno]["balance"]}`,
  //         statusCode: 200
  //       }
  //       //    userDetails[acno2]["balance"] `Your Account have been Debited with amount ${amt} And The Available Balance is ${result}`

  //     } else {
  //       return {
  //         status: false,
  //         message: "Insufficient balance",
  //         statusCode: 404
  //       }
  //       //   ("Insufficient balance")
  //     }

  //   }
  //   else {
  //     return {
  //       status: false,
  //       message: "Password incorrect",
  //       statusCode: 404
  //     }
  //   }

  // }
  // else {
  //   return {
  //     status: false,
  //     message: "Account number incorrect",
  //     statusCode: 404
  //   }
  // }
  // if (acno in userDetails) {
//   if (pwd == userDetails[acno]["password"]) {
//     userDetails[acno]["balance"] += amount

//     //add tranaction data
//     userDetails[acno]["transaction"].push(
//       {
//         Type: "Credit",
//         Amount: amount
//       }
//     )
//     return {
//       status: true,
//       message: `Your Account have been credited with amount ${amount} And The Available Balance is ${userDetails[acno]["balance"]}`,
//       statusCode: 200
//     }


//   } else {
//     return {
//       status: false,
//       message: "Password incorrect",
//       statusCode: 404
//     }
//   }
// } else {
//   return {
//     status: false,
//     message: "Account number incorrect",
//     statusCode: 404
//   }
// }
//code before db
// if (acno in userDetails) {
//   return {
//     status: false,
//     message: "user already present",
//     statusCode: 404
//   }
// } else {
//   userDetails[acno] = { username: uname, acno, password: psw, balance: 0, transaction: [] }
//   //   console.log(userDetails);
//   return {
//     status: true,
//     message: "Registered",
//     statusCode: 200
//   }
// }