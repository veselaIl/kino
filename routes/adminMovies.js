/******* MOVIES ***** */
var express = require('express');
var ObjectId = require('mongodb').ObjectId; 
var router = express.Router();
var fs = require('fs');
var path = require('path');


/* GET ALL MOVIES */
router.get('/admin/api/movies', function(req, res){
    req.db.get('movies').find().then(function(movies){
      if(movies.length){
        // console.log('Movies', movies)
        res.json(movies);
      }else{
        console.log('No movies')
      }
    })
    .catch(function(err){
      console.log(err);
    })
  })
  
  /* ADD NEW MOVIE */
  router.post('/admin/api/movies/add',function(req, res){
    var movie, 
        id;
    req.db.get('movies').find(
      { },
      { sort: { movieID: -1}},
      function(err, docs) {
        id = +docs[0].movieID;
  
        if (req.body) {
          movie = {
            movieID : ++id,
            name: req.body.movie.name,
            description: req.body.movie.description,
            duration: +req.body.movie.duration,
            genre: req.body.movie.genres,
            image: '/images/movies/' + req.body.movie.image,
            largeImage: '/images/movies/' + req.body.movie.largeImage,
            trailer : req.body.movie.trailer,
            directorName : req.body.movie.directorName,
            actors : req.body.movie.actors,
            premierDate: req.body.movie.premieDate,
            dublaj : !req.body.movie.dublaj
          };
         
          req.db.get('movies')
          .insert(movie)
          .then(function(data){
            res.json({ text: 'You successfully add new Movie!' , id : movie.movieID});
          })
          .catch(function(err) {
            console.log('catch', err);
            res.status(err.status || 500);
            res.send();
          });
        }else{
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
  
  router.get('/admin/api/movies/movie/:id', function(req, res){
    var movie;
    req.db.get('movies').find({ movieID : +req.params.id })
      .then(function (data){
        console.log(data);
        movie = data[0] || {};
        res.json({ movie : movie });
      })
      .catch(function(err) {
        console.log('catch', err);
        res.status(err.status || 500);
        res.send();
      });
  
  })
  
  /* GET MOVIE BY NAME */
  router.get('/admin/api/movie/:name', function(req, res){
    var movie;
    console.log(req.params);
    req.db.get('movies').find({ name: req.params.name})
      .then(function(data){
        movie = data[0] || {};
        res.json({ movie: movie})
      })
      .catch(function(err){
        console.log(err);
        res.status(err.status || 500);
        res.send();
      })
  })
  
  router.post('/admin/api/movie/remove/:id', function(req, res){
    req.db.get('movies').remove({movieID : id})
      .then(function (data){
        res.json({ data : data });
      })
      .catch(function (err){
        res.status(err.status || 405);
        res.send();
      })
  })

module.exports = router;
  