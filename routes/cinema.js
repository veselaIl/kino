var express = require('express');
var router = express.Router();

//GET ALL Cinemas
router.get('/cinemas', function (req, res){
    req.db
        .get('cinemas').find()
        .then(function (cinemas){
            if(cinemas.length){
                res.json(cinemas);
            } else {
                console.log('No cinemas');
            }
        })
        .catch(function (err){
            console.log(err);
        })
})

module.exports = router;