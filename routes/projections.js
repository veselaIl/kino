var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

router.get('/projections', function (req, res){
    //GET all projections
    req.db.get('projection').find()
        .then(function (projections){            
            if(projections.length){
                //Get movieID from projections
                // console.log('All Projections: ', projections);
                // var moviesID = [];
                // projections.forEach(p => {
                //     moviesID.push(p.movieID);
                // });
                // console.log('MoviesID: ', moviesID);
                // req.db.get('movies').find()
                // //req.db.get('movies').findOne({ _id: projections.movieID})
                // res.json(projections);
                res.json({ projections : projections})
            } else {
                res.sendStatus(404);
            }
        })
});
router.get('/projections/movies/', function (req, res){
    console.log(req);
    req.db.get('movies').find({ name : { $in : req.query.movie }})
        .then(function (movies){
            if (movies.length){
                res.json({ movies : movies});
            } else {
                res.sendStatus(404);
            }
        })
})

module.exports = router;