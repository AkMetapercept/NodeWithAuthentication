const User=require("../model/user")

const bcrypt=require("bcryptjs")


//bCrypting 
exports.register = async (req, res, next) => {
    const { username, password } = req.body

    bcrypt.hash(password,10).then(async (hash)=>{

        await User.create({
            username,
            password:hash,
        })
        .then((user)=>{
            res.status(200).json({
                message:"User SuccessFully Created",
                user,
            })
        })
        .catch((error)=>{
            res.status(400).json({
                message:"UserNot Created ",
                error:error.message,
            })
        })
    })

}
        //Without crypting
    // if (password.length < 6) {
    //   return res.status(400).json({ message: "Password less than 6 characters" })
    // }
    // try {
    //   await User.create({
    //     username,
    //     password,
    //   }).then(user =>
    //     res.status(200).json({
    //       message: "User successfully created",
    //       user,
    //     })
    //   )
    // } catch (err) {
    //   res.status(401).json({
    //     message: "User not successful created",
    //     error: error.message,
    //   })
    // }
    //}
 


//compare The password With bCrypted Password

  exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user) {
        res.status(401).json({
          message: "Login not successful",
          error: "User not found",
        })
      }
      else{

        bcrypt.compare(password,user.password).then(function (result){
           
            result ? res.status(200).json({
                message:"User Login Success. ",
                user,
            })
            :res.status(400).json({
                message:"User Not Login",
                error:error.message,
            })
        })   
      }
    } catch (error) {
      res.status(400).json({
        message: "An error occurred",
        error: error.message,
      })
    }
  }