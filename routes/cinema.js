var express = require('express');
var router = express.Router();

//GET ALL Cinemas
router.get('/cinemas', function (req, res){
    req.db
        .get('kino').find()
        .then(function (cinemas){
            if(cinemas.length){
                res.json(cinemas);
            } else {
                console.log('No cinemas');
                res.sendStatus(404);
            }
        })
        .catch(function (err){
            console.log(err);
            res.sendStatus(err || 400);
        })
})

//GET current cinema
router.get('/cinemas/view-cinema/:kinoID', function (req, res){
    console.log('+req.params.kinoID', +req.params.kinoID);
    console.log('Request body', req.body);
    console.log('DB Kino collection: ', req.db.get('kino').findOne({ kinoID: +req.params.kinoID }));
    req.db   
        .get('kino').findOne({ kinoID: +req.params.kinoID})//може да пробвам с kinoID
        .then(function (cinema){
            if(cinema){
                console.log('Response JSON: ', res.json);
                res.json({ cinema: cinema });
            } else {
                res.sendStatus(404);
            }            
        })
        .catch(function (err){
            res.sendStatus(err || 400);
        })
})

module.exports = router;