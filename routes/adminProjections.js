var express = require('express');
var ObjectId = require('mongodb').ObjectId; 
var router = express.Router();


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
// get all projections from now on.
router.get('/admin/api/projections', function (req, res){
  var findObj = {},
  findFields = { sort: { time: 1 } };

  // from now on
  var startDate = new Date();
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);
  
  var findObj = {
    time : {
        $gte : parseInt(startDate.getTime()/1000)
    }
  };

  req.db.get('projection').find( findObj, findFields )
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
                          projections.forEach(projection => {
                           var index = movies.findIndex(movie => movie.movieID ===projection.movieID);
                           projection.movieName = movies[index].name;
                          })
                          result = {
                            projections : projections
                          }
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
        .then(function (projection){
          if (projection.length) {
            projection = projection[0] || [];
            var result = { projection : projection };
            req.db.get('kino').findOne({ kinoID : +projection.kinoID})
              .then(function (cinema){
                result['cinema'] = cinema;
                req.db.get('movies').findOne({ movieID : projection.movieID})
                  .then(function (movie){
                    result['movie'] = movie;
                    res.json(result);
                })
            })
          } else {
            res.sendStatus(500);
          }
        })
})
         
       


//delete projection
router.post('/admin/api/projections/delete/:id', function (req, res){
  if (req.params.id) {
    req.db.get('projection')
      .remove({ _id : ObjectId(req.params.id)})
      .then(function (data){
         res.json({ text : 'You successfully deleted projection!'});
      })
      .catch(function (err){
        res.status(err.status || 405)
      })
  } else {
    res.sendStatus(405);
  }

})

// router.post('/admin/api/projections/add/:kinoID', function(req, res){

//   if (req.body.projections) {

//     req.db.get('kino').findOneAndUpdate({ kinoID : +req.params.kinoID }, {$push: { projections : req.body.projections }})
//       .then(function( projections){
//         console.log( projections);
//         res.json({ projections: projections })
//       })
//       .catch(function(err){
//         console.log(err);
//         res.status(err.status || 500);
//         res.send();
//       })
//   }
// })

/* ADD PROJECTIONS */
router.post('/admin/api/projections/add', function(req, res){
  req.db.get('projection')
    .insert(req.body.projections)
    .then(function (projections){
      if (projections.length){
        res.json({ text : 'You successfully added projections'});
      } else {
        res.sendStatus(404);
      }
    })
})


  module.exports = router;
