var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

//GET ALL movies
router.get('/movies', function (req, res){
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
router.get('/movies/preview-movie/:id', function(req, res){
    req.db.get('movies').find({ _id: new mongodb.ObjectId(req.params.id) })
        .then(function(movies){
            if(movies){
                var movie = movies[0] || {};
                res.json({ movie: movie });
            } else {
                res.sendStatus(404);
            }
        });
});

module.exports = router;