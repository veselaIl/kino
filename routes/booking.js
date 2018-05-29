var express = require('express');
var ObjectId = require('mongodb').ObjectId; 
var router = express.Router();

router.get('/api/book/:id', function (req, res){
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        console.log(req.params);
        req.db.get('projection').find({ _id : new ObjectId(req.params.id)})
            .then(function (data){
                var projection = data[0];
                console.log(projection);    
                var result = { projection : projection}  
                console.log(projection.movieID);
                var cinemaID = projection.kinoID;
                console.log(cinemaID);
                req.db.get('movies').find({ movieID : projection.movieID})
                    .then(function (movie){
                        console.log(movie);
                        result['movie'] = movie;
                        req.db.get('kino').find({kinoID : cinemaID})
                        .then(function (cinema){
                            
                            result['cinema'] = cinema;
                            res.json(result);
                        })  
                    })
                    console.log(cinemaID);
                   
                  
                })
            .catch(function (err){
                res.sendStatus(500);
            })    
    }
})

module.exports = router;