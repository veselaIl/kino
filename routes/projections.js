var express = require('express');
var router = express.Router();

router.get('/api/projections', function (req, res){
    console.log('/api/projections', req.query.date);
    //GET all projections
    var startDate = new Date(req.query.date || undefined);
    var endDate = req.query.date ? startDate : null;
    // set time
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    if (endDate) {
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);
        endDate.setMilliseconds(999);
    }
    var findObj = {};
    req.db.get('projection').find(findObj, {
        
    })
        .then(function (projections) {
            console.log('projections', projections.length);
            if (projections.length) {
                var result = {
                    projections: projections
                }
                movies = [];
                projections.forEach(p => {
                    if (movies.indexOf(p.movieID) === -1) {
                        movies.push(p.movieID);
                    }
                });
                console.log('movies', movies);

                req.db.get('movies').find({ movieID: { $in : movies } })
                    .then(function (movies) {
                        console.log('movies', movies.length);
                        if (movies.length){
                            //console.log("projectios.js : ", movies);
                            result['movies'] = movies;

                            res.json(result);
                        } else {
                            res.sendStatus(404);
                        }
                    });
            } else {
                res.sendStatus(404);
            }
        });
});

// router.get('/api/movies-projections', function (req, res){
//     //console.log('projections.js', req.query);

//     // get the movies ids from the movieID param and convert them to numbers
//     var movies = req.query.movieID ? req.query.movieID.split(',').map(m => +m) : [];
//     console.log('movies', movies);
//     var findObject = movies.length ? { movieID : { $in : movies }} : {};

//     req.db.get('movies').find(findObject, { sort: { time: -1 } } )
        
//         .then(function (movies){
            
//             console.log('movies', movies.length);
//             if (movies.length){
//                 //console.log("projectios.js : ", movies);
//                 res.json({ movies : movies});
//             } else {
//                 res.sendStatus(404);
//             }
//         })
// })

module.exports = router;
