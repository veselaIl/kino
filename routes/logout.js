var express = require('express');
var router = express.Router();

router.get('/logout', function (req, res){
    console.log('logout ');

    if (req.session.user) {
        req.session.destroy(function (err) {
            console.log('destroy', err);
            res.sendStatus(err ? 500 : 200);
        });
    } else {
        res.send();
    }
});

module.exports = router;