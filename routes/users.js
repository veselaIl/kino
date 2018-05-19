var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/users', function(req, res, next) {
//   res.render('users');
// });

//GET User profile page
router.get('/user/profile/:id', function (res, req){
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        req.db
            .get('users')
            .findOne({ id: +req.params.id})
            .then(function (user){
                if(user){
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(function (err){
                console.log(err);
            })
    }
});

//User favourites
router.post('/user/favourites/:movieID', function (req, res){
    if(!req.session.user){
        res.sendStatus(401);
    } else {
       req.db.get('users').findOne({ _id: req.session.user._id})
            .then(function (user){
                if(!user){
                    res.sendStatus(401);
                } else {
                    var index = user.favourites.indexOf(req.params.movieID);
                    console.log('INDEX: ', index);
                    console.log('Favourites', user.favourites);
                    if(index !== -1){
                        user.favourites.splice(index, 1);
                    } else {
                        user.favourites.push(req.params.movieID);
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

//Change user profile

module.exports = router;
