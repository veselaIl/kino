var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

function isLogged(req){
    return req.session.user;
}

router.post('/login', function (req, res, next){
    console.log('login post', req.body);

    if(isLogged(req)){
        res.send('/');
    } else {
        var errors = [];

        if(!errors.length){
            var usersCollection = req.db.get('users');
            usersCollection.findOne({
                email: req.body.email,
                password: sha1(req.body.password)
            })
            .then(function (user){
                if(user){
                    console.log('login user', user);
                    delete user.password;
                    req.session.user;
                    req.session.save();
                    res.send('/');
                } else {
                    console.log('Грешно име или парола!');
                    errors.push('Грешно име или парола!');
                    res.send('login', {errors: errors});
                }
            })
            .catch(function (err){
                console.log('Login Error: ', err);
                errors.push(err);
                res.send('login', {errors: errors});
            })
        } else {
            res.send('login', {errors: errors});
        }
    }
})
module.exports = router;