var express = require('express');
var router = express.Router();

router.get('/api/book/kinoID/zalaID/movieID/time', function (req, res){
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        req.get('projection').find({ 
            $and: [ { 
                kinoID: { $eq: +req.params.kinoID } 
            }, { 
                zalaID: { $eq: +req.params.zalaID }
            }, {
                movieID: { $eq: +req.params.movieID }
            }, {
                time: { $eq: parseInt(req.params.time.getTime())/1000 }
            } ] 
        }) .then(function (projections){
                if(projections){
                    console.log("Projections: ", projections);
                    var result = {
                        projections: projections
                    }
                    req.db.get('kino').findOne({ kinoID: +req.params.kinoID })
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
                    req.db.get('movies').findOne({ movieID: +req.params.movieID })
                    .then(function (movie){
                        console.log('movie', movie);
                        if(movie){
                            //findObj.kinoID = cinema.kinoID;
                            //console.log('findObj.kinoID', findObj.kinoID);
                            result['movie'] = movie;
                            console.log('result', result);
                                
                        } else {
                            res.sendStatus(404);
                        }
                    });   

                    res.json({ projections : projections });
                } else {
                    res.sendStatus(404);
                }                
            })
    }
})

module.exports = router;