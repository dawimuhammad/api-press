const User  = require('../models/user')
const jwt = require ('jsonwebtoken')

class UserController{

   static logIn(req,res) {
       
      let { username, password } = req.body

      User.findOne({ username })
      .then(function (user) {

         user.comparePassword(password, function(err, isMatch) {
            if (err) {
               res
               .status(401)
               .json({
                  message: err.message
               })
            }
            else {
               if(isMatch) {
                  let token = jwt.sign({_id: user.id}, process.env.secretKey)
                  res
                  .status(200)
                  .json({
                     user,
                     token,
                     message: "Token generated"
                  });
               }
               else {
                  res
                  .status(400)
                  .json({
                     message: "Password is wrong!"
                  })
               }
            }
         })
      })
      .catch(function(err) {
         res
         .status(400)
         .json("User is not found!");
      })
   }

   static findAll (req, res) {
     User.find({}).exec( function (err, users) {
        if (err) {
          res
             .status(500)
             .send(err.message)
        } else {
          res
            .status(200)
            .send(users)
        }
     })
   }

   static findOne (req, res) {
      User.findById( req.params.userId )
      .then( function (user) {
         res.status(200)
         .send(user);
      })
      .catch(function(err) {
         res
         .status(400)
         .send(err.message)
      })
    }

   static register (req, res) {
      let { username, password } = req.body

       User.create({
             username,
             password
       })
       .then( function (result) {
             res
             .status(200)
             .json({
                message: "Successfully created new user",
                data: result
             })
       })
       .catch( function (err) {
          res.send(err)
             .status(500)
             .json({
                message: err.message
             })
       })
   }
}

module.exports = UserController;
