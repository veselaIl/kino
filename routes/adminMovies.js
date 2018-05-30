/******* MOVIES ***** */
var express = require('express');
var ObjectId = require('mongodb').ObjectId; 
var router = express.Router();


/* GET ALL MOVIES */
router.get('/admin/api/movies', function(req, res){
    req.db.get('movies').find().then(function(movies){
      if (movies.length) {
        // console.log('Movies', movies)
        res.json(movies);
      } else {
        console.log('No movies')
      }
    })
    .catch(function (err){
      console.log (err);
    })
})
  
/* ADD NEW MOVIE */
router.post('/admin/api/movies/add',function(req, res){
  var moviesDB = req.db.get('movies');
  moviesDB.find({},{sort: { movieID: -1}, limit : 1})
  .then( function(item){
    console.log(item);
    if (req.body) {
      movie = {
        movieID : ++item[0].movieID,
        name: req.body.movie.name,
        description: req.body.movie.description,
        duration: +req.body.movie.duration,
        genre: req.body.movie.genre,
        image: req.body.movie.image,
        largeImage: req.body.movie.largeImage,
        trailer : req.body.movie.trailer,
        directorName : req.body.movie.directorName,
        actors : req.body.movie.actors,
        premierDate: req.body.movie.premierDate,
        dublaj : !req.body.movie.dublaj,
        suitable: req.body.movie.suitable
      };
      moviesDB.insert(movie)
        .then(function(data){
          res.json({ text: 'You successfully add new Movie!' , id : movie.movieID});
        })
        .catch(function(err) {
          console.log('catch', err);
          res.status(err.status || 500);
          res.send();
        });
    } else {
      res.status(400);
      res.send();
    }      
  });
})
  
  
  // /* GET MOVIE TO EDIT */
  // router.get('/api/movies/edit/:id', function(req, res){
  //   var movie;
  //   console.log(req.params);
  //   req.db.get('movies').find({ movieID : +req.params.movieID })
  //     .then(function(data){
  //       movie = data[0] || {};    
  //       res.json('Movie', movie)
  //     })    
  // })
  
// GET MOVIE BY ID
router.get('/admin/api/movies/movie/:id', function(req, res){
  var movie;
  if( req.params.id) {
  req.db.get('movies').find({ movieID : +req.params.id })
    .then(function (data){
      movie = data[0] || {};
      res.json({ movie : movie });
    })
    .catch(function(err) {
      res.status(err.status || 500);
      res.send();
    });
  } else {
    res.status(err.status || 500);
    res.send();
  }
})

router.post('/admin/api/movies/edit', function (req, res){
  console.log(req.body);
  if (req.body.movie){
    req.db.get('movies')
    .update({ _id : new ObjectId(req.body.movie._id)}, {$set : req.body.movie})
    .then(function (response){
      if (response) {
        console.log(response);
        res.json({ text : 'Movie successfully edited!'});
      } else { 
        res.sendStatus(400);
      }
    })
  } else {
    res.sendStatus(500);
  }
  
})
// /* GET MOVIE BY NAME */
// router.get('/admin/api/movie/:name', function(req, res){
//   var movie;
//   req.db.get('movies').find({ name: req.params.name})
//     .then(function(data){
//       movie = data[0] || {};
//       res.json({ movie: movie})
//     })
//     .catch(function(err){
//       res.status(err.status || 500);
//       res.send();
//     })
// })

//Remove movie and projections
router.post('/admin/api/movie/remove/:id', function(req, res){
  req.db.get('movies').remove({movieID : +req.params.id})
    .then(function (data){
      if (data){
        req.db.get('projection').remove({ movieID : +req.params.id })
          .then(function (projections){
            res.json({ text: 'You successfully removed movie' });
          })
      } else {
        res.sendStatus(405);
      }
    })
})  

module.exports = router;
  