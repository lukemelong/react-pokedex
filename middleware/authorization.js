const jwt = require('jsonwebtoken')

function authorize(req, res, next){
    console.log(req.headers['x-auth-token'])
    if(req.headers['x-auth-token']){
        const err = verifyToken(req.headers['x-auth-token'])
        if(err){
            return res.status(401).json({message: err.name + ": " + err.message})
        }
        next();
    }
    else{
        return res.status(401).json({message: 'No token'})
    }
}

function verifyToken(token){
    return jwt.verify(token, process.env.JWT_SECRET, (err, result)=>{
        if(err){
            return err
        }
    })
}

module.exports.authorize = authorize