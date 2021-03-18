var user = require ('../model/user-model')
var jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    let promise = user.findOne({username: req.body.username}).exec();

    promise.then(function(confirmUser){
        if(confirmUser){
            if(confirmUser.comparePassword(req.body.password)){
                // generate token
                let token = jwt.sign({username: confirmUser.username}, 'secret', {expiresIn: '3h'})
                return res.status(200).json(token);
            }else{
                return res.status(501).json({message: 'Invalid Credentials!'})
            }
        }else{
            return res.status(501).json({message: 'Invalid Username!'})
        }
    })
}