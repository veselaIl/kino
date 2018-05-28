var express = require('express');
var router = express.Router();

//GET ALL movies
router.get('/api/movies', function (req, res){    
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

module.exports = router;