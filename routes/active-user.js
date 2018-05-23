var express = require('express');
var router = express.Router();

//GET current user
router.get('/active-user', function (req, res){
    var id = req.session.user ? req.session.user._id : -1;
    //console.log('req.session.user._id', req.session.user._id);
    if(id !== -1){
        req.db.get('users').findOne({ _id: id})
            .then(function (user){
                if(user){
                    console.log('User Session', req.session.user);
                    console.log('User Session', req.session.user._id);
                    res.json({
                        isAdmin : user.isAdmin,
                        favourites : user.favourites
                    });
                } else {
                    console.log('test');
                    req.session.destroy();
                    res.sendStatus(404);
                }                
            });

    } else {
        res.json();
    }
    
})

//Change user profile

module.exports = router;
