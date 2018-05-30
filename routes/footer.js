var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

router.get('/api/contacts', function (req, res){
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