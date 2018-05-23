var express = require('express');
var router = express.Router();

router.get('/projections', function (req, res){
    //GET all projections
<<<<<<< HEAD
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
=======
    req.db.get('projection').aggregate([
        {
            $lookup: {
                from: "kino", 
                localField: "kinoId", 
                foreignField: "_id", 
                as: "kino" 
            }
        },
        {
            $lookup: {
                from: "movies", 
                localField: "movieID", 
                foreignField: "_id", 
                as: "movie" 
            }
        },
        {
            $unwind: "$kino"
        },
        {
            $unwind: "$movie"
        },
        {
            $project: {
                _id: 1,
                type: 1,
                time: 1,
                movie: 1,
                kino: 1
            }
        }
    ])
        .then(function (projections){     
            if(projections.length) {
                console.log('Projections: ' , projections);
                res.json(projections);
>>>>>>> 1c50d283cdc42a73e12bbb787d2c6677c1164354
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