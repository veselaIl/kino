
var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var ObjectId = require('mongodb').ObjectId;

//GET if user is logged
// router.get('/profile', function (res, req){
//     if(req.session.user){
//         res.json(req.session.user);
//     } else {
//         res.sendStatus(401);
//     }
// })



//GET User personal info
router.get('/api/profile/personal-info', function (req, res){
    console.log("req.body", req.body);
    if(!req.session.user){
        console.log('GET Personal info no logged user');
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
                        lastName: user.lastName
                    });
                }
                console.log('personal-info end');
            });
    }
});

//- change user first and/or last name
router.post('/api/profile/personal-info', function (req, res){
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
router.post('/api/profile/change-password', function(req, res){
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        req.db.get('users').findOne({ _id: req.session.user._id })
            .then(function (user){
                if(!user){
                    res.sendStatus(404);
                } else {
                    var oldPass = sha1(user.email + req.body.user.oldPassword),
                        newPass = sha1(user.email + req.body.user.newPassword),
                        confirmNewPassword = sha1(user.email + req.body.user.confirmNewPassword);
                        console.log('oldPass', oldPass);
                        console.log('newPass', newPass);
                        console.log('confirmNewPassword', confirmNewPassword);
                        //user.password = sha1(req.body.user.email + req.body.user.password);
                    if(oldPass !== user.password 
                        || newPass !== confirmNewPassword){
                            res.sendStatus(400);                            
                    } else {
                        if(req.body.user.newPassword.length >= 6 && req.body.user.confirmNewPassword.length >= 6) {
                            console.log('req.body.user.newPassword');
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
                }
            });
    }
});

//User favourites add favourites
router.post('/api/user/favourites/:id', function (req, res){
    if(!req.session.user){
        res.sendStatus(401);
    } else {
       req.db.get('users').findOne({ _id: req.session.user._id})
            .then(function (user){
                if(!user){
                    res.sendStatus(401);
                } else {
                    var index = user.favourites.indexOf(+req.params.id);
                    console.log('INDEX: ', index);
                    console.log('Favourites', user.favourites);
                    if(index !== -1){
                        user.favourites.splice(index, 1);
                    } else {
                        user.favourites.push(+req.params.id);
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

//Get user FAVOURITES
router.get('/api/profile/favourites', function (req, res){
    console.log("/api/profile/favourites init ");
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        req.db.get('users').findOne({ _id: req.session.user._id })
            .then(function (user){
                if(!user){
                    res.sendStatus(404);
                } else {
                    req.db.get('movies').find({ movieID: { $in: user.favourites }})
                        .then(function (movies){
                            //console.log("movies: ", movies.length);
                            res.json({ movies: movies });
                        });
                }
            });
    }
});

//GET users reservations
router.get('/api/profile/orders', function (req, res){
    console.log('/api/profile/orders init');
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        console.log("orders _id: req.session", req.session.user._id);
       
        req.db.get('reservations').find({ userID: ObjectId(req.session.user._id) })
            .then(function (reservations){
                console.log('Reservations', reservations);
                if(!reservations){
                    res.sendStatus(404);
                } else {
                    var result = {
                        reservations : reservations
                    }
                    console.log('Reservations', reservations); 
                    req.db.get('users').findOne({ _id : ObjectId(req.session.user._id) })
                        .then(function (user){
                            if(!user){
                                res.sendStatus(404);
                            } else {
                                console.log('Reservations user', user);
                                result['user'] = user;
                            }                            
                        })

                        projs = [];
                        reservations.forEach(r => {
                            if(projs.indexOf(ObjectId(r.projectionID)) === -1){
                                console.log('r.projectionID', r.projectionID);
                                console.log('r.projectionID', ObjectId(r.projectionID));
                                projs.push(ObjectId(r.projectionID));
                            }
                        });
                        
                        console.log('Projs', projs);
                    req.db.get('projections').find({ _id: { $in : projs } })
                        .then(function (projections){
                            if(!projections){
                                res.sendStatus(404);
                            } else {
                                result['projections'] = projections;
                                console.log('Projections', projections);
                            }

                                // req.db.get('kino').findOne({ kinoID: projection.kinoID })
                                //     .then(function (kino){
                                //         if(!kino){
                                //             res.sendStatus(404);
                                //         } else {
                                //             result['kino'] = kino;
                                //         }   
                                //     })

                    //             req.db.get('movies').findOne({ movieID : projection.movieID })
                    //                 .then(function (movie){
                    //                     if(!movie){
                    //                         res.sendStatus(404);
                    //                     } else {
                    //                         result['movie'] = movie;
                    //                         res.json(result);
                    //                     }
                    //                 })
                    //         }
                         })
                }
            })
    }
})

module.exports = router;
