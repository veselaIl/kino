var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

//Login user
router.post('/login', function (req, res){
    console.log('login ', req.body);

    if (req.session.user) {
        res.sendStatus(400);
    } else {
        var usersCollection = req.db.get('users');
        usersCollection.findOne({
            email: req.body.email,
            password: sha1(req.body.email + req.body.password)
        })
        .then(function (user){
            if (user) {
                console.log('login user', user);
                delete user.password;
                req.session.user = user;
                req.session.save(() =>{
                    res.json({ 
                        isAdmin: user.isAdmin,                            
                        favourites: user.favourites
                    });
                });
            } else {
                console.log('User not found or bad password!');
                res.sendStatus(404);
            }
        })
    }
});

module.exports = router;