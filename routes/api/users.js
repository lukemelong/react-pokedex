const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const validate = require('./validation/validateUserRegister')
const validateLogin = require('./validation/validateUserLogin')

// /* Get All */
router.get('/', function(req, res, next) {
  User.find({}, null ,{"sort": {'_id': 1}} , (err, result) =>{
      if(err){
          return res.status(404).send("Error from user get all:")
      }
      res.status(200).send(result)
  })
});

/* Login */
router.post('/login', (req, res) =>{
    // Validate the input data
    const {error} = validateLogin.validateUserLogin(req.body)
    if(error){
        return res.status(400).json({message: `Incorrect User format for login: ${error.details[0].message}`})
    }
    // Check if user exists using unique email
    User.find({"email": req.body.email}, (err, result) =>{
        if(err || result.length === 0){
            let errMessage = "Invalid Login"
            return res.status(400).json({message: errMessage})
        }
        // Check password against hash
        bcrypt.compare(req.body.password, result[0].password, (berr, bresult) => {
            console.log(result[0].firstName)
            if(!bresult){
                let message = "Invalid Login"
                return res.status(400).json({message: message})
            }
            // Create token and send to user
            jwt.sign({user: result[0].firstName}, process.env.JWT_SECRET, {expiresIn: 60 * 30}, (err, token) =>{
                if(err){
                    return res.status(400).json({message: "Bad token signing"})
                }
                return res
                .status(200)
                .set({
                    'x-auth-token': token,
                    'Access-Control-Expose-Headers': '*'
                })
                .json({message: "Succesfully signed in"});
            })
        })
    })
})
/* New User */
router.post('/register', (req, res) =>{
    const {error} = validate.validateUser(req.body)
    if(error){
        return res.status(400).json({message: `Incorrect User format for POST: ${error.details[0].message}`})
    }

    let newUser = new User(req.body)
    
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return res.status(400).json({message: "Error generating salt"})
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) return res.status(400).json({message: "Error hashing password"})

            newUser.password = hash;
            newUser.save((err, result) =>{
                if(err){
                    return res.status(400).json({message: "Error from user post: " + err.errmsg})
                }
                jwt.sign({user: result.firstName}, process.env.JWT_SECRET, {expiresIn: 60 * 30}, (err, token) =>{
                    if(err){
                        return res.status(400).json({message: "Bad token signing"})
                    }
                    res
                    .status(200)
                    .set('x-auth-token', token)
                    .set('Access-Control-Expose-Headers', '*')
                    .json({message: "User Succesfully Created. Succesfully signed in"});
                })
            })
        })
    })
})

// /* Update */
// router.put('/:id', (req, res) =>{
//     const {error} = validate.validateUser(req.body)
//     if(error){
//         return res.status(400).send("Incorrect User format for PUT: " + error.details[0].message)
//     }
//     user.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, result) =>{
//         if(err){
//             return res.status(400).send("Error from user put request: " + err.errmsg)
//         }
//         return res.status(200).send("Successfully Updated: " + result)
//     })
// })

// /* Delete */
// router.delete('/:id', (req, res) =>{
//     user.findByIdAndRemove(req.params.id, (err, result) =>{
//         if(err){
//             return res.status(404).send("Cannot find user resource to delete")
//         }

//         res.status(200).send("Succesfully Deleted: " + result);
//     })
// })
module.exports = router;