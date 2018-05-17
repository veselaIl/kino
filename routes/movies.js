var express = require('express');
var router = express.Router();

var movie;

//GET ALL movies
router.get('/movies', function (req, res){
    console.log('movies.js', req.db.get('movies').find());
    req.db
        .get('movies').find()
        .then(function (movies){
            if(movies.length){
                res.json(movies);
            } else {
                console.log('No movies');
            }            
        })
        .catch(function (err){
            console.log(err);
        })
})

//GET current movie
router.get('/movies/preview-movie/:movieID', function(req, res){
    req.db
        .get('movies').findOne({ movieID: +req.params.movieID})
        .then(function(movie){
            if(movie){
                res.json({ movie : movie});
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err){
            res.sendStatus(err || 400);
        })
})

module.exports = router;