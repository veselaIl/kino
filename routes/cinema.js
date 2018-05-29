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
router.get('/api/cinemas/view-cinema/:id', function (req, res){
    // console.log('+req.params.kinoID', +req.params.kinoID);
    // console.log('Request body', req.body);
    // console.log('DB Kino collection: ', req.db.get('kino').findOne({ kinoID: +req.params.kinoID }));
    req.db   
        .get('kino').findOne({ kinoID : +req.params.id})
        .then(function (cinema){
            if(cinema){
                console.log('Response JSON: ', res.json);
                res.json({ cinema: cinema });
            } else {
                res.sendStatus(404);
            }            
        })
})

//send message from user in contacts form
router.post('/api/contacts-form', function (req, res){
    console.log("Request body", req.body);
    var messagesDB = req.db.get('messages');
    messagesDB.insert({
        creationDate: new Date(),
        username: req.body.message.username,
        email: req.body.message.email,
        phoneNumber: req.body.message.phoneNumber,
        textMessage: req.body.message.textMessage
    }).then(function (data) {
        res.sendStatus(200);
    })
})

module.exports = router;