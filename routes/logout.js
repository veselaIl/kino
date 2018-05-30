var express = require('express');
var router = express.Router();

router.get('/api/logout', function (req, res){
    console.log('user', req.session.user);
    if (req.session.user) {
        req.session.destroy(function (err) {
            console.log('destroy', err);
            res.clearCookie('connect.sid');
            res.sendStatus(err ? 500 : 200);
        });
    } else {
        res.sendStatus(200);
    }
});

module.exports = router;