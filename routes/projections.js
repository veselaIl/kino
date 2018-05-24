var express = require('express');
var router = express.Router();

router.get('/api/projections', function (req, res){
    //GET all projections
    
    req.db.get('projection').find()
        .then(function (projections){            
            if(projections.length){
                res.json({ projections : projections})
            } else {
                res.sendStatus(404);
            }
            
        })
});

router.get('/api/projections/movies/', function (req, res){
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
