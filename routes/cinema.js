var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

//GET ALL Cinemas
router.get('/api/cinemas', function (req, res){
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
})

//GET current cinema
router.get('/cinemas/view-cinema/:id', function (req, res){
    // console.log('+req.params.kinoID', +req.params.kinoID);
    // console.log('Request body', req.body);
    // console.log('DB Kino collection: ', req.db.get('kino').findOne({ kinoID: +req.params.kinoID }));
    req.db   
        .get('kino').findOne({ _id: req.params.id})
        .then(function (cinema){
            if(cinema){
                console.log('Response JSON: ', res.json);
                res.json({ cinema: cinema });
            } else {
                res.sendStatus(404);
            }            
        })
})

module.exports = router;