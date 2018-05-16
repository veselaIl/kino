var express = require('express');
var router = express.Router();

var movie;

//GET ALL movies
router.get('/api/movies', function (req, res){
    console.log('movies.js', req.db.get('movies').find());
    req.db
        .get('movies').find()
        .then(function (movies){
            if(movies.length){
                console.log('movies', movies);
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
// router.get('/api/movies/preview-movie/:id', function(req, res){
//     req.db  
//         .get('movies').find({ movieID: +req.params.movieID })
//         .then(function(data){
//             movie = data[0] || {};
//             res.json('Movie', movie);
//         })
// })

module.exports = router;