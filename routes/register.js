var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

function isLogged(req){
    return req.session.user;
}

function validateEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}
//Register post
router.post('/register', function (req, res){
    console.log('Register post: ', req.body);
    console.log('Session', req.session);
    if(isLogged(req)){
        res.redirect('/');
    } else {
        var errors = [];
        if(!validateEmail(req.body.email)){
            console.log('Въведе валиден имейл адрес!');
            errors.push('Въведе валиден имейл адрес!');
        } 

        if(req.body.password.length < 6){
            console.log('Паролата трябва да бъде поне 6 символа!');
            errors.push('Паролата трябва да бъде поне 6 символа!');
        }

        if(req.body.password !== req.body.confirmPassword){
            console.log('Паролте не съвпадат!');
            errors.push('Паролте не съвпадат!');
        }

        if(!errors.length){
            var usersCollection = req.db.get('users');
            usersCollection.findOne({email: req.body.email})
                .then(function (user){
                    if(!user){
                        if(users.length === 0){
                            req.body.isAdmin = true;
                        } else {
                            req.body.isAdmin = false;
                            req.body.favourites = [];
                            req.body.reservations = [];
                        }
                        
                        //Get all users and register current
                        usersCollection.find()
                            .then(function (arr){
                                req.body.password = sha1(req.body.password);
        
                                usersCollection.insert(req.body)
                                    .then(function (user){
                                        console.log('User Registered: ', user.email);
                                        delete usersCollection.password;
                                        req.session.user = user;
                                        req.session.save();
                                        res.json(user);
                                    })
                            })
                    } else {
                        console.log('Вече съществува потребител с този имейл!');
                        errors.push('Вече съществува потребител с този имейл!');
                    }
                    
                })
                .catch(function (err){
                    console.log(err);
                    errors.push(err);
                    res.send('register', {errors: errors});
                })
        } else {
            res.send('register', {errors: errors});
        }
        
    }
});

module.exports = router;