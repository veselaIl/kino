var express = require('express');
var router = express.Router();

router.get('/api/projections', function (req, res){

    console.log('/api/projections', req.query.date);
    //GET all projections

    var findObj = {},
        findFields = { sort: { time: 1 } };

    var startDate = new Date(+req.query.date || undefined);

    // set time
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    console.log(startDate);
    console.log(startDate.getTime());
    console.log(startDate.getTime()/1000);
    console.log(parseInt(startDate.getTime()/1000));
    var findObj = {
        time : {
            $gte : parseInt(startDate.getTime()/1000)
        }
    };
    
    if (req.query.date) {
        var endDate = startDate;
        if (endDate) {
            endDate.setHours(24);

            findObj.time.$lt = parseInt(endDate.getTime()/1000)
        }
    }

    console.log('find', findObj, findFields);

    req.db.get('projection').find(findObj, findFields)
        .then(function (projections) {
            console.log('projections', projections.length, projections);
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
