var express = require('express');
var router = express.Router();

//GET current user
router.get('/active-user', function (req, res){
    res.json(req.session.user ? { isAdmin: req.session.user.isAdmin} : undefined);
})

//Change user profile

module.exports = router;
