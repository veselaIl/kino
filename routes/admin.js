var express = require('express');
var router = express.Router();

/* GET admin home page. */
router.get('/admin', function(req, res, next) {
  res.render('admin');
});

/* GET admin cinemas page. */
router.get('/admin/cinema', function(req, res, next) {
  req.db.get('kino').find().then(function(cinemas){
    if(cinemas.length){
      console.log('Cinemas', cinemas)
      res.json(cinemas);
    }else{
      console.log('No cinemas')
    }
  })
  .catch(function(err){
    console.log(err);
  });
})
/* GET admin cinemas page. */
router.get('/admin/projections', function(req, res, next) {
  req.db.get('projections').find().then(function(cinemas){
    if(cinemas.length){
      console.log('Cinemas', projections)
      res.json(projections);
    }else{
      console.log('No projections')
    }
  })
  .catch(function(err){
    console.log(err);
  });
})
/* ADD PROJECTION TO CINEMA */
router.get('/admin/cinema/addProjection/:kinoID', function(req, res, next){
  req.db.get('movies').find().then(function(movies){
    res.render('addProjection', { movies: movies })
  })
})

/* GET admin cinema details page. */
router.get('/admin/cinema/details/:kinoID', function(req, res, next) {
  req.db.get('kino').find({ kinoID : +req.params.kinoID }).then(function(cinemas){
    var cinema = cinemas[0] || {};
    res.render('cinemaDetails', cinema);
  });
});

/* GET admin cinema zala details*/
router.get('/admin/cinema/details/:kinoID/:zalaID', function(req, res, next){
  req.db.get('kino').find({ kinoID : +req.params.kinoID}, {zali :{ $elemMatch: { zalaID : +req.params.zalaID}}})
  .then(function(cinemas){
    var cinema = cinemas[0] || {};
    res.render('cinemaDetails', cinema);
  })
})

/* EDIT ZALA */
router.post('/admin/cinema/details/:kinoID/:zalaID', function(req, res, next){
  var zala,
      cinema;
  req.db.get('kino').find({ kinoID : +req.params.kinoID}, {zali :{ $elemMatch: { zalaID : +req.params.zalaID}}})
  .then(function(data){
      cinema = data[0] || {};
      if (req.body){ 
        //Fill with 0
          var newZala = [],
              rows = [];
          for (var i = 0; i < req.body.space.length; i++){
               newZala.length =  req.body.space.length;
            for (var j = 0; j < req.body.space; j++){
              rows[j] = 0;
            }
            newZala[i] = rows;
            rows = [];
          }
          zala = cinema.zali.find(x=> x.zalaID === +req.params.zalaID);
          zala.zalaID = +req.params.zalaID;
          zala.space = newZala;
          req.db.get('kino').update({ kinoID : +req.params.kinoID, "zali.zalaID" : +req.params.zalaID}, {$set : { "zali.$":  zala}})
          .then(function(err) {
            res.redirect('/admin/cinema/details/:kinoID');
          })
          .catch(function(err) {
            res.redirect('/admin/cinema/details/:kinoID');
          });
      }
  })
})
/* GET ZALA*/
router.get('/admin/cinema/details/:kinoID?newSalloon', function(req, res){
  req.db.get('kino').find({ kinoID : +req.params.kinoID }).then(function(cinemas){
     var cinema = data[0] || {};
     res.redirect('/admin/cinema/details/:kinoID?newSalloon', cinema);
  })
})
/* GET ALL MOVIES */
router.get('/admin/movies', function(req, res){
  req.db.get('movies').find().then(function(movies){
    if(movies.length){
      console.log('Movies', movies)
      res.json(movies);
    }else{
      console.log('No movies')
    }
  })
  .catch(function(err){
    console.log(err);
  })
})

/* GET ADD MOVIE TEMPLATE-FORM */ 
router.get('/admin/movies/add', function(req, res){
  res.render('addMovie');
})

/* ADD NEW MOVIE */
router.post('/admin/movies/add',function(req, res, next){
  var movie, 
      id;

  req.db.get('movies').find(
    { },
    { sort: { movieID: -1}},
    function(err, docs) {
      id = +docs[0].movieID;

      if (req.body && req.body.name) {
        movie = {
          movieID : ++id,
          name: req.body.name,
          description: req.body.description,
          duration: +req.body.duration,
          genre: req.body.genre,
          image: '/images/movies/' + req.body.image ,
          trailer : req.body.trailer,
          director : {
            name: req.body.director,
            img : '/images/directors/' + req.body.directorImage },
          actors : [
            {
              name: req.body.actors[0],
              image : ''
            },
            {
              name: req.body.actors[1],
              image: ''
            },
            {
              name: req.body.actors[2],
              image: ''
            }],
           premierDate: new Date(req.body.premierDate),
           dublaj : !req.body.dublaj
        };
        req.db.get('movies')
        .insert(movie)
        .then(function(data){
          res.redirect('/admin/movies');
          res.json({ text: 'You successfully add new Movie!' });
        })
      }
  });
})

router.get('/admin/movies/edit/:movieID', function(req, res){
  var movie;
  req.db.get('movies').find({ movieID : +req.params.movieID }).then(function(data){
    movie = data[0] || {};    
    res.render('addMovie', movie);
  })
})

/*  EDIT MOVIE */
router.post('/admin/movies/edit/:movieID', function(req, res, next){
  var movie = {
    movieID : +req.params.movieID,
    name : req.body.name,
    description : req.body.description,
    duration : +req.body.duration,
    genre : req.body.genre,
    image : '/images/movies/' + req.body.image,
    trailer : req.body.trailer, 
    director : {
      name : req.body.director,
      img : '/images/directors/' + req.body.directorImage },
    actors : [
      {
        name : req.body.actors[0],
        image : ''
      },
      {
        name : req.body.actors[1],
        image : ''
      },
      {
        name : req.body.actors[2],
        image : ''
      }],
    premierDate : new Date(req.body.premierDate),
    dublaj : !req.body.dublaj  
  }
  req.db.get('movies').update({ movieID : +req.params.movieID  }, movie)
  .then(function(data) {
    res.redirect('/admin/movies');
  })
})

router.get('/admin/cinema/addCinema', function(req, res){  
    res.render('addCinema');
})

/* GET all users registered */
router.get('/admin/users', function(req, res, next) {
  res.render('adminUsers')
});


module.exports = router;