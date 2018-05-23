var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

//User favourites
router.post('/user/favourites/:id', function (req, res){
    if(!req.session.user){
        res.sendStatus(401);
    } else {
       req.db.get('users').findOne({ _id: req.session.user._id})
            .then(function (user){
                if(!user){
                    res.sendStatus(401);
                } else {
                    var index = user.favourites.indexOf(req.params.id);
                    console.log('INDEX: ', index);
                    console.log('Favourites', user.favourites);
                    if(index !== -1){
                        user.favourites.splice(index, 1);
                    } else {
                        user.favourites.push(req.params.id);
                    }

                    req.db.get('users').findOneAndUpdate({ _id: req.session.user._id}, {$set: {favourites: user.favourites}})
                        .then(function (result){
                            if(!result){
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200);
                            }
                        });

                }
            });
    }
});

//GET User personal info
router.get('/profile', function (req, res){
    console.log("_id: req.session", req.session);
    // console.log("req.body", req.body);
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        req.db.get('users').findOne({ _id: req.session.user._id })
            .then(function (user){
                console.log('users.js show user info user:', user);
                if(!user){
                    res.sendStatus(404);
                } else {
                    res.json({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    });
                }
            });
    }
});

//- change user first and/or last name
router.post('/profile', function (req, res){
    console.log('req.session.user', req.session.user);
    console.log('req.body.user', req.body.user);
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        console.log('findOneAndUpdate',  req.db.get('users').findOne({ _id: req.session.user._id }));
        req.db.get('users').findOne({ _id: req.session.user._id})
            .then(function (user){
                if(!user){
                    res.sendStatus(404);
                } else {                
                    req.db.get('users').findOneAndUpdate({ _id: req.session.user._id }, 
                        { $set: { firstName: req.body.user.firstName, lastName: req.body.user.lastName } })
                        .then(function (result){
                            if(!result){
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(200);
                            }
                        });

                }
            });
    }
});

//change password
router.post('/profile/change-password', function(req, res){
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        req.db.get('users').findOne({ _id: req.session.user._id })
            .then(function (user){
                if(!user){
                    res.sendStatus(404);
                } else {
                    console.log('/profile/change-password: ', user);
                    console.log('CurrentPAss: ', user.password);
                    console.log('oldPass', sha1(user.email + req.body.user.oldPassword));
                    console.log('newPass', sha1(user.email + req.body.user.newPassword));
                    var oldPass = sha1(user.email + req.body.user.oldPassword),
                        newPass = sha1(user.email + req.body.user.newPassword),
                        confirmNewPassword = sha1(user.email + req.body.user.confirmNewPassword);
                        //user.password = sha1(req.body.user.email + req.body.user.password);
                    if(oldPass !== user.password 
                        || newPass !== confirmNewPassword){
                            res.sendStatus(400);
                    } else {
                        req.db.get('users').findOneAndUpdate({ _id: req.session.user._id }, 
                            { $set: { password: newPass } })
                            .then(function (result){
                                if(!result){
                                    res.sendStatus(500);
                                } else {
                                    console.log('Change password was success: ');
                                    res.sendStatus(200);
                                }
                            });
                    }
                }
            });
    }
});

//Get user FAVOURITES
router.get('/profile/favourites', function (req, res){
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        req.db.get('users').findOne({ _id: req.session.user._id})
            .then(function (user){
                if(!user){
                    res.sendStatus(404);
                } else {
                    console.log("favourites: ", user.favourites);
                    var favourites = [];
                    user.favourites.forEach(f => {
                        return favourites.push(f);
                    });
                    req.db.get('movies').find({ _id: { $in: favourites }})
                        .then(function (movies){
                            res.json({ movies: movies });
                        })
                    
                }
            });
    }
});

module.exports = router;
