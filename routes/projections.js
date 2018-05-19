var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

router.get('/projections', function (req, res){
    //GET all projections
    req.db.get('projections').find()
        .then(function (projections){            
            if(projections.length){
                //Get movieID from projections
                console.log('All Projections: ', projections);
                var moviesID = [];
                projections.forEach(p => {
                    moviesID.push(p.movieID);
                });
                console.log('MoviesID: ', moviesID);
                req.db.get('movies').find()
                //req.db.get('movies').findOne({ _id: projections.movieID})
                res.json(projections);
            } else {
                res.sendStatus(404);
            }
        })
});

module.exports = router;