var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

//GET ALL movies
router.get('/api/movies', function (req, res){
    console.log('movies.js', req.db.get('movies').find());
    req.db.get('movies').find()
        .then(function (movies){
            if(movies.length){
                res.json(movies);
            } else {
                console.log('No movies');
            }            
        })
        .catch(function (err){
            console.log(err);
        });
});

//GET current movie
router.get('/api/movies/preview-movie/:id', function(req, res){
    req.db.get('movies').find({ movieID: +req.params.id })
        .then(function(movies){
            if(movies){
                var movie = movies[0] || {};
                console.log('movie:', movie);
                res.json({ movie: movie });
            } else {
                res.sendStatus(404);
            }
        });
});

module.exports = router;