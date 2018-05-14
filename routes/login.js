var express = require('express');
var router = express.Router();
var sha1 = require('sha1');


router.post('/api/login', function (req, res){
    console.log('login ', req.body);

    if (req.session.user) {
        res.sendStatus(400);
    } else {
        // var errors = [];

        // if(!errors.length){
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
                    req.session.save(() =>{
                        res.json(user);
                    });
                } else {
                    // console.log('Грешно име или парола!');
                    // errors.push('Грешно име или парола!');
                    // res.send('login', {errors: errors});
                    res.sendStatus(404);
                    console.log('User not found or bad password!');
                }
            })
            .catch(function (err){
                console.log('Login Error: ', err);
                // errors.push(err);
                res.send('login', err);
            })
        // } else {
            // res.send('login', {errors: errors});
        }
})
module.exports = router;