var express = require('express');
var ObjectId = require('mongodb').ObjectId; 
var router = express.Router();

router.get('/admin/api/users', function (req, res){
    req.db.get('users').find({ isAdmin : false })
        .then(function (users){
            if (users.length) {
            // console.log('Movies', movies)
            res.json(users);
            } else {
                res.sendStatus(500);
            }
        })
})

router.post('/admin/api/users/remove/:id', function (req, res){
    req.db.get('users')
        .remove({ _id : ObjectId(req.params.id)})
        .then(function (response){
            res.sendStatus(200);
        })
        .catch(function (err){
            res.sendStatus(err.status || 405)
        })
    
})


module.exports = router;
