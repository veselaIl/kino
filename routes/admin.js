var express = require('express');
var ObjectId = require('mongodb').ObjectId; 
var router = express.Router();


/********* CINEMA *********** */
/* GET admin cinemas page. */
router.get('/admin/cinema', function(req, res) {
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
// GET CINEMA
router.get('/api/cinema/:id/:zala', function(req, res){
  var cinema;
  console.log(req.params);
  req.db.get('kino').find({ kinoID : +req.params.id}, {}, {zali :{ $elemMatch: { zalaID : +req.params.zala}}})
    .then(function(data){
      // console.log(data)
      cinema = data[0] || {};
      res.json({ cinema: cinema })
    })
    .catch(function(err){
      console.log(err);
      res.status(err.status || 500);
      res.send();
    })
})
// ADD CINEMA
router.post('/api/cinema/add', function(req, res){
  var cinema, 
      id;
  console.log(req.body);
  req.db.get('kino').find(
    { },
    { sort: { kinoID: -1}},
    function(err, docs) {
      id = +docs[0].kinoID;
      if (req.body) {
        cinema = {
          kinoID : ++id,
          name : req.body.cinema.name,
          address : req.body.cinema.address,
          //adding fields for image and phone number 
          image: req.body.cinema.image,
          phoneNumber: req.body.cinema.phoneNumber,
          zali : req.body.cinema.zali,
          projections : [],
          reservations : []
        }
        req.db.get('kino')
        .insert(cinema)
        .then(function(data){
          res.json({ text: 'You successfully add new Cinema!' , id : cinema.kinoID});
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
  // req.db.get('kino').insert({
    
  // })
  });
});
//  GET PROJECTIONS IN CINEMA 
router.get('/api/cinema/projections/:id', function(req, res){
  req.db.get('kino').find({ kinoID : req.params.id})
    .then(function(data){
      var cinema = data[0] || {};
      res.json({ cinema: cinema});
    })
    .catch(function(err){
      res.status(err.status || 500);
      res.send;
    })
});
/* GET projections cinemas page. */
router.get('/api/projections/', function(req, res) {  
  req.db.get('projection').find()
    .then(function(data){
      res.json(Array.isArray(data) ? data : [])
    })
    .catch(function(err){
      console.log('catch', err);
      res.status(err.status || 500);
      res.send();
    })
});
/* GET projections cinemas page. */
router.get('/api/projects/', function(req, res) {  
  req.db.get('projection').find()
    .then(function(data){
      res.json(Array.isArray(data) ? data : [])})
    .catch(function(err){
      console.log('catch', err);
      res.status(err.status || 500);
      res.send();
    })
});
/* GET PROJECTION */
router.get('/api/projections/:id', function(req, res){
  req.db.get('projection').find({ _id : new ObjectId(req.params.id)})
    .then(function(data){
      projection = data[0] || []
      res.json({projection : projection});
    })
    .catch(function(err){
      res.status(err.status || 500);
      res.send();
    })
})
// /* ADD PROJECTION TO CINEMA */
// router.post('/api/projection/add', function(req, res){
//   var projection, 
//       id;

//   req.db.get('projections').find(
//     { },
//     { sort: { projectionID: -1}},
//     function(err, docs) {
//       id = +docs[0].projectionID;

//       console.log(req.body);
//       if (req.body){
//         projection = {
//           movieID: req.body.projection.movie,
//           zalaID: req.body.projection.zalaID,
//           kinoID: req.body.projection.kinoID,
//           projections : req.body.projection.projections
//         }
//         req.db.get('projections')
//         .insert(projection)
//         .then(function(projection){
//           res.json({ text: 'Projection successfully added', projection : projection});
//         })
//         .catch(function(err){
//           console.log(err);
//           res.status(err.status || 500);
//           res.send();
//         });
//       } else {
//         res.status(err.status || 500);
//         res.send();
//       } 
//   })
// });
router.post('/api/projections/add/:kinoID', function(req, res){
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
router.post('/api/projections/add', function(req, res){

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


// /* GET admin cinema details page. */
// router.get('/admin/cinema/details/:kinoID', function(req, res, next) {
//   req.db.get('kino').find({ kinoID : +req.params.kinoID }).then(function(cinemas){
//     var cinema = cinemas[0] || {};
//     res.render('cinemaDetails', cinema);
//   });
// });

// /* GET admin cinema zala details*/
// router.get('/admin/cinema/details/:kinoID/:zalaID', function(req, res){
//   req.db.get('kino').find({ kinoID : +req.params.kinoID}, {zali :{ $elemMatch: { zalaID : +req.params.zalaID}}})
//   .then(function(cinemas){
//     var cinema = cinemas[0] || {};
//     res.render('cinemaDetails', cinema);
//   })
// })


/*****END CINEMA ******** */

/* EDIT ZALA */
router.post('/admin/cinema/details/:kinoID/:zalaID', function(req, res){
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

/******* MOVIES ***** */


/* GET ALL MOVIES */
router.get('/api/movies', function(req, res){
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
router.post('/api/movies/add',function(req, res){
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
          image: req.body.movie.image ,
          trailer : req.body.movie.trailer,
          director : req.body.movie.director,
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

/* GET MOVIE TO EDIT */
router.get('/api/movies/edit/:id', function(req, res){
  var movie;
  req.db.get('movies').find({ movieID : +req.params.movieID })
    .then(function(data){
      movie = data[0] || {};    
      res.json('Movie', movie)
    })    
})

/* GET MOVIE BY NAME */
router.get('/api/movie/:name', function(req, res){
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
// /*  EDIT MOVIE */
// router.post('/api/movies/edit/:movieID', function(req, res, next){
//   var movie = {
//     movieID : +req.params.movieID,
//     name : req.body.name,
//     description : req.body.description,
//     duration : +req.body.duration,
//     genre : req.body.genre,
//     image : '/images/movies/' + req.body.image,
//     trailer : req.body.trailer, 
//     director : {
//       name : req.body.director,
//       img : '/images/directors/' + req.body.directorImage },
//     actors : [
//       {
//         name : req.body.actors[0],
//         image : ''
//       },
//       {
//         name : req.body.actors[1],
//         image : ''
//       },
//       {
//         name : req.body.actors[2],
//         image : ''
//       }],
//     premierDate : new Date(req.body.premierDate),
//     dublaj : !req.body.dublaj  
//   }
//   req.db.get('movies').update({ movieID : +req.params.movieID  }, movie)
//   .then(function(data) {

//   })
// })
/********END MOVIES***** */
// router.get('/admin/cinema/add', function(req, res){  
//     res.render('addCinema');
// })

// /* GET all users registered */
// router.get('/admin/users', function(req, res, next) {
//   res.render('adminUsers')
// });

module.exports = router;