var express = require('express');
var router = express.Router();

router.get('/api/logout', function (req, res){
    if (req.session.user) {
        req.session.destroy(function (err) {
            console.log('destroy', err);
            res.clearCookie('connect.sid');
            res.sendStatus(err ? 500 : 200);
        });
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;