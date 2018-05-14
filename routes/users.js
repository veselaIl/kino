var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/users', function(req, res, next) {
//   res.render('users');
// });
//GET User profile page
router.get('/user/:id', function (res, req){
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        req.db
            .get('users')
            .findOne({ id: +req.params.id})
            .then(function (user){
                if(user){
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(function (err){
                console.log(err);
            })
    }
})

//Change user profile

module.exports = router;
