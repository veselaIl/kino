var express = require('express');
var router = express.Router();

router.get('/api/booking-ticket/:id', function (req, res){
    if(!req.session.user){
        res.sendStatus(401);
    } else {
        req.get('projection').find({ movieID: +req.params.id })            
            .then(function (projections){
                if(projections){
                    console.log("Projections: ", projections);
                    res.json({ projections : projections });
                } else {
                    res.sendStatus(404);
                }                
            })
    }
})

module.exports = router;