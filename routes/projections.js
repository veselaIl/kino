var express = require('express');
var router = express.Router();

router.get('/projections', function (req, res){
    //GET all projections
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
            } else {
                res.sendStatus(404);
            }
            
        })
});

module.exports = router;