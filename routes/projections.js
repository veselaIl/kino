var express = require('express');
var router = express.Router();

//Get all projections for all cinemas and movies
router.get('/api/projections', function (req, res){

    console.log('/api/projections', req.query.date);
    //GET a ll projections

    var findObj = {},
        findFields = { sort: { time: 1 } };

    //getting start date from request query
    var startDate = new Date(+req.query.date || undefined);

    // set time to beginning of the day
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    console.log(startDate);
    console.log(startDate.getTime());
    console.log(startDate.getTime()/1000);
    console.log(parseInt(startDate.getTime()/1000));
    //initialize searched object with date between request query date
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

    // console.log('find', findObj, findFields);

    req.db.get('projection').find(findObj, findFields)
        .then(function (projections) {
            console.log('projections', projections.length, projections);
            if (projections.length) {
                var result = {
                    projections: projections
                }
                var cinemas = [];
                projections.forEach(p => {
                    if(cinemas.indexOf(p.kinoID) === -1) {
                        console.log('kinoID', p.kinoID);
                        cinemas.push(p.kinoID);
                    }
                });
                console.log('cinemas', cinemas);
                req.db.get('kino').find({ kinoID: { $in : cinemas } })
                    .then(function (cinemas){
                        // console.log('cinemas', cinemas.length);
                        if(cinemas.length){
                            result['cinemas'] = cinemas;  
                            movies = [];
                
                            projections.forEach(p => {                  
                                if (movies.indexOf(p.movieID) === -1) {
                                    movies.push(p.movieID);  
                                }                     
                            });   
                            req.db.get('movies').find({ movieID: { $in : movies } })
                                .then(function (movies) {
                                    //console.log('movies', movies.length);
                                    if (movies.length){
                                        //console.log("projectios.js : ", movies);
                                        result['movies'] = movies; 
                                        res.json(result);
                                    } else {
                                        res.sendStatus(404);
                                    }
                                });                          
                            // result['cinemas'] = cinemas;                        
                        } else {
                            res.sendStatus(404);
                        }
                    });
               

            } else {
                res.sendStatus(404);
            }
        });
});

//Get all projections for choosed cinema by cinemaId
router.get('/api/cinemas/:id/projections', function (req, res){
    console.log('/api/cinemas/:id/projections',req.params.id, req.query.date);
    //GET all projections

    var findObj = {},
        findFields = { sort: { time: 1 } };
    
    //getting start date from request query
    var startDate = new Date(+req.query.date || undefined);

    // set time to beginning of the day
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

            findObj.time.$lt = parseInt(endDate.getTime()/1000);
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
                req.db.get('kino').find({ kinoID: +req.params.id })
                    .then(function (cinema){
                        console.log('cinema', cinema);
                        if(cinema){
                            //findObj.kinoID = cinema.kinoID;
                            //console.log('findObj.kinoID', findObj.kinoID);
                            result['cinema'] = cinema;
                            console.log('result', result);
                                
                        } else {
                            res.sendStatus(404);
                        }
                    });                          
                movies = [];
                console.log('result after', result);
                projections.forEach(p => {                  
                    if (p.kinoID === +req.params.id && movies.indexOf(p.movieID) === -1) {
                        //console.log('findObj.kinoID', findObj.kinoID);
                        console.log('p.kinoID', p.kinoID);
                        movies.push(p.movieID);  
                    }                     
                });   

                console.log('movies', movies);

                req.db.get('movies').find({ movieID: { $in : movies } })
                    .then(function (movies) {
                        console.log('movies', movies.length);
                        if (movies.length){
                            console.log("projectios.js : ", movies);
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
})

//Get all projections for current movie and show all movie projections in all cinemas
router.get('/api/movies/preview-movie/:id/projections', function (req, res){
    // console.log('/api/movies/preview-movie/:id/projections',req.params.id, req.query.date);
    //GET all projections

    var findObj = {},
        findFields = { sort: { time: 1 } };
    
    //getting start date from request query
    var startDate = new Date(+req.query.date || undefined);

    // set time to beginning of the day
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);

    // console.log(startDate);
    // console.log(startDate.getTime());
    // console.log(startDate.getTime()/1000);
    // console.log(parseInt(startDate.getTime()/1000));

    var findObj = {
        time : {
            $gte : parseInt(startDate.getTime()/1000)
        }
    };
    
    if (req.query.date) {
        var endDate = startDate;
        if (endDate) {
            endDate.setHours(24);

            findObj.time.$lt = parseInt(endDate.getTime()/1000);
        }
    }

    // console.log('find', findObj, findFields);

    req.db.get('projection').find(findObj, findFields)
        .then(function (projections) {
            // console.log('projections', projections.length, projections);
            if (projections.length) {
                var result = {
                    projections: projections
                }  
                req.db.get('movies').findOne({ movieID: +req.params.id })
                    .then(function (movie){
                        // console.log('movie', movie);
                        if(movie){
                            result['movie'] = movie;
                            // console.log('result', result);
                                
                        } else {
                            res.sendStatus(404);
                        }
                    });      

                cinemas = [];
                // console.log('result after', result);
                projections.forEach(p => {                  
                    if (p.movieID === +req.params.id && cinemas.indexOf(p.kinoID) === -1) {
                        //console.log('findObj.kinoID', findObj.kinoID);
                        //console.log('p.kinoID', p.movieID);
                        cinemas.push(p.kinoID);  
                    }                     
                });   

                // console.log('cinemas', cinemas);

                req.db.get('kino').find({ kinoID: { $in : cinemas } })
                    .then(function (cinemas) {
                        // console.log('cinemas', cinemas.length);
                        if (cinemas.length){
                            // console.log("projectios.js : ", cinemas);
                            result['cinemas'] = cinemas;                           
                            res.json(result);
                        } else {
                            res.sendStatus(404);
                        }
                    });

            } else {
                res.sendStatus(404);
            }
        });     

    
})

module.exports = router;
