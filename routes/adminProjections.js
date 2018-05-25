var express = require('express');
var ObjectId = require('mongodb').ObjectId; 
var router = express.Router();
var fs = require('fs');
var path = require('path');


  // /* GET projections cinemas page. */
  // router.get('/admin/api/projections/', function(req, res) {  
  //   req.db.get('projection').find()
  //     .then(function(data){
  //       res.json(Array.isArray(data) ? data : [])
  //     })
  //     .catch(function(err){
  //       console.log('catch', err);
  //       res.status(err.status || 500);
  //       res.send();
  //     })
  // });

  router.get('/admin/api/projections', function (req, res){
    console.log('/api/projections', req.query.date);
    //GET all projections
    var startDate = new Date();
    // var endDate = req.query.date ? startDate : null;
    // // set time
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate = startDate.getTime();
    // if (endDate) {
    //     endDate.setHours(23);
    //     endDate.setMinutes(59);
    //     endDate.setSeconds(59);
    //     endDate.setMilliseconds(999);
    // }
    var findObj = {};
    req.db.get('projection').find( findObj, { time : { $gte : startDate}
    })
        .then(function (projections) {
            console.log('projections', projections.length);
            if (projections.length) {
                var result = {
                    projections: projections
                }
                movies = [];
                projections.forEach(p => {
                    if (movies.indexOf(p.movieID) === -1) {
                        movies.push(p.movieID);
                    }
                });
                console.log('movies', movies);

                req.db.get('movies').find({ movieID: { $in : movies } })
                    .then(function (movies) {
                        console.log('movies', movies.length);
                        if (movies.length){
                            //console.log("projectios.js : ", movies);
                            result['movies'] = movies;

                            res.json(result);
                        } else {
                            res.sendStatus(404);
                        }
                    });
            } else {
                res.sendStatus(404);
            }
        });
});


// /* GET projections cinemas page. */
// router.get('/admin/api/projects/', function (req, res) {  
//     req.db.get('projection').find()
//       .then(function(data){
//         res.json(Array.isArray(data) ? data : [])})
//       .catch(function(err){
//         console.log('catch', err);
//         res.status(err.status || 500);
//         res.send();
//       })
//   });

  
/* GET PROJECTION */
router.get('/admin/api/projections/:id', function (req, res){
req.db.get('projection').find({ _id : new ObjectId(req.params.id)})
    .then(function(data){
    console.log(data)
    projection = data[0] || []
    res.json({projection : projection});
    })
    .catch(function(err){
    res.status(err.status || 500);
    res.send();
    })
})
//delete projection
router.post('/admin/api/projections/delete/:id', function (req, res){
console.log(req.params);
req.db.get('projection').remove({ _id : ObjectId(req.params.id)})
    .then(function (data){
        res.json({ data : data });
    })
    .catch(function (err){
    req.status(err.status || 405)
    })
})

router.post('/admin/api/projections/add/:kinoID', function(req, res){
  console.log(req.body);
  console.log(req.params);
  if(req.body.projections){
    req.db.get('kino').findOneAndUpdate({ kinoID : +req.params.kinoID }, {$push: { projections : req.body.projections }})
      .then(function(data){
        console.log(data);
        res.json({projections: projections})
      })
      .catch(function(err){
        console.log(err);
        res.status(err.status || 500);
        res.send();
      })
  }
})

/* ADD PROJECTIONS */
router.post('/admin/api/projections/add', function(req, res){
    if (req.body.projections){
      req.db.get('projection')
      .insert(req.body.projections)
      .then(function(projections){
        res.json({projections : projections});
      })
      .catch(function(err){
        console.log(err);
        res.status(err.status || 500);
        res.send();
      })
    } else { 
      res.status(err.status || 500);
      res.send;
    }
  })


  module.exports = router;
