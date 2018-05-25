var express = require('express');
var router = express.Router();

router.get('/api/projections', function (req, res){

    console.log('/api/projections', req.query.date);
    //GET all projections

    var findObj = {},
        findSearch = {};

    var startDate = new Date(req.query.date || undefined);

    // set time
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    var findSearch = {
        time : {
            $gte : parseInt(startDate.getTime()/1000)
        }
    };
    
    if (req.query.date) {
        var endDate = startDate;
        if (endDate) {
            endDate.setHours(24);

            findSearch.time.$lt = parseInt(endDate.getTime()/1000)
        }
    }

    console.log('find', findObj, findSearch);

    req.db.get('projection').find(findObj, findSearch)
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


module.exports = router;
