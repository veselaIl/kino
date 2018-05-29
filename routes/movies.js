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

//Get all projections for current movie and show all movie projections in all cinemas
router.get('/api/movies/:id', function (req, res){
    var findObj = {},
        findFields = { sort: { time: -1 } }
    //getting start date from request query
    var startDate = new Date();

    // set time to beginning of the day
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    var findObj = {
        time : {
            $gte : parseInt(startDate.getTime()/1000)
        }
    };
    // console.log('find', findObj, findFields);
    req.db.get('projection').find({time: { $gte : parseInt(startDate.getTime()/1000)}})
        .then(function (projections){
            var cinemas = [];
            
            if (projections.length){
                var projections = projections.filter(projection => projection.movieID === +req.params.id);
                projections.forEach(p => {
                    if(cinemas.indexOf(p.kinoID) === -1) {
                        cinemas.push(p.kinoID);
                    }
                });
                var result =   {projections :projections};
                
                req.db.get('kino').find({ kinoID: { $in : cinemas } })
                .then(function (cinemas){
                   
                    req.db.get('movies').find({ movieID : +req.params.id })
                    .then(function (movie){
                        result['cinemas'] = cinemas;   
                        result['movie'] = movie;
                        res.json(result);   
                    })  
                });
            } else {
                res.sendStatus(404);
            }
            
            });
        });

module.exports = router;