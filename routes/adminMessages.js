var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId; 

//Get admin messages page
router.get('/admin/api/messages', function(req, res){
    req.db.get('messages').find()
        .then(function(messages){
            if(messages.length){
                console.log('Messages', messages);
                res.json(messages);
            } else {
                res.sendStatus(400);
            }
        });
});


//Get message from user by message _id
router.get('/admin/api/messages/:id', function (req, res){
    console.log('Get MESSAGE ID: ', req.params);
    req.db.get('messages').findOne({ _id: ObjectId(req.params.id) })
        .then(function (message){
            if(message){
                res.json({ message: message});
            } else {
                res.sendStatus(400);
            }
        });
});

//delete message
router.post('/admin/api/messages/remove/:id', function(req, res){
    console.log('req.params.id', req.params);
    req.db.get('messages').remove({ _id: ObjectId(req.params.id) })
        .then(function (message){
            if(message){
                res.sendStatus(200)
            } else {
                res.sendStatus(400);
            }
        })
})

module.exports = router;