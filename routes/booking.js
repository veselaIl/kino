var express = require('express');
var ObjectId = require('mongodb').ObjectId; 
var router = express.Router();

router.get('/api/book/:id', function (req, res){
    if(!req.session.user){
        res.sendStatus(401);
    } else {

        req.db.get('projection').find({ _id : new ObjectId(req.params.id)})
            .then(function (data){
                var projection = data[0];
                var result = { projection : projection}  
                var cinemaID = projection.kinoID;
                req.db.get('movies').find({ movieID : projection.movieID})
                    .then(function (movie){
                        result['movie'] = movie;
                        req.db.get('kino').find({kinoID : cinemaID})
                        .then(function (cinema){
                            
                            result['cinema'] = cinema;
                            res.json(result);
                        })  
                    })

                })
            .catch(function (err){
                res.sendStatus(500);
            })    
    }
})
router.post('/api/book/projection/:id', function (req, res){
    console.log(req.body, 'reserve ticket');
    console.log(req.session.user);
    
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        req.db.get('projection')
            .update({ _id : new ObjectId(req.params.id)},{$set :{ mesta : req.body.mesta }})
            .then( function(result){
                console.log(result);
                if (result) {
                    var reservation = {
                        userID : new ObjectId(req.session.user._id),
                        projectionID : new ObjectId(req.params.id),
                        reservation : req.body.reservation
                    }
                    req.db.get('reservations').insert(reservation)
                        .then(function (result){
                            if(result){
                                res.sendStatus(200);
                                res.json({ text : 'Successfully added reservation'});
                            } else {
                                res.sendStatus(400);
                            }
                        })
                    
                } else {
                    res.sendStatus(400);
                }
            })
    }
})


module.exports = router;