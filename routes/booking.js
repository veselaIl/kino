var express = require('express');
var router = express.Router();

router.get('/booking-ticket/:id', function (req, res){
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        req.get('kino')
    }
})

module.exports = router;