var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

//GET if user is logged
// router.get('/profile', function (res, req){
//     if(req.session.user){
//         res.json(req.session.user);
//     } else {
//         res.sendStatus(401);
//     }
// })

//Login user
router.post('/login', function (req, res){
    console.log('login ', req.body);

    if (req.session.user) {
        res.sendStatus(400);
    } else {
        var usersCollection = req.db.get('users');
        // console.log(usersCollection);
        // console.log({
        //     email: req.body.email,
        //     password: sha1(req.body.email + req.body.password)
        // });
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
                    res.json({ isAdmin: user.isAdmin });
                });
            } else {
                console.log('User not found or bad password!');
                res.sendStatus(404);
            }
        })
    }
});

module.exports = router;