var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

// function isLogged(req){
//     return req.session.user;
// }

function validateEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

//GET if user is logged
router.get('/profile', function (res, req){
    if(req.session.user){
        res.json(req.session.user);
    } else {
        res.sendStatus(401);
    }
});

router.post('/register', function(req, res){
    console.log('Session', req.session);
    console.log(req.body.user);
    if (req.session.user
        || req.body.user.password !== req.body.user.confirmPassword
        || req.body.user.password.length < 6
        || !validateEmail(req.body.user.email)
    ) {
        res.sendStatus(400);
    } else {
        //проверка дали вече не съществува потребител с този email
        var usersCollection = req.db.get('users');
        //console.log('usersCollection',  req.db.get('users'));
        usersCollection.findOne({ email : req.body.user.email })
            .then(function(user){
                if (user){
                    res.sendStatus(409)
                } else {
                    // check for existing users , if not admin is first user
                    usersCollection.find()
                        .then(function(users){
                            var user = {};
                            if (users.length){
                                user.email = req.body.user.email;
                                user.firstName = '';
                                user.lastName = '';
                                user.isAdmin = false;
                                user.favourites = [];
                                user.reservations = [];
                            } else {
                                user.email = req.body.user.email;
                                user.isAdmin = true;
                            }
                            user.password = sha1(req.body.user.email + req.body.user.password);
                            usersCollection.insert(user)
                                .then(function (user){
                                    console.log('User Registered: ', user);
                                    delete user.password;
                                    req.session.user = user;
                                    req.session.save(() =>{
                                        res.json({ 
                                            isAdmin: user.isAdmin,
                                            favourites: user.favourites
                                         });
                                    });
                                })
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                }
            });
        
    }
});

module.exports = router;