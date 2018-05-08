var express = require('express');
var router = express.Router();

/* GET admin home page. */
router.get('/admin', function(req, res, next) {
  res.render('admin');
});

/* GET admin cinemas page. */
router.get('/admin/cinema', function(req, res, next) {
  req.db.get('kino').find().then(function(cinemas){
    res.render('cinema',{ cinemas: cinemas});
  });
});

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
/* EDIT zala */
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
router.get('/admin/cinema/details/:kinoID?newSalloon', function(req, res, next){
  req.db.get('kino').find({ kinoID : +req.params.kinoID }).then(function(cinemas){
     var cinema = data[0] || {};
     res.redirect('/admin/cinema/details/:kinoID?newSalloon', cinema);
  })
})
/* GET ALL MOVIES */
router.get('/admin/movies', function(req, res, next){
  req.db.get('movies').find().then(function(movies){
    res.render('movies',{ movies: movies});
  })
})

router.get('/admin/movies/addMovie', function(req, res, next){
  res.render('addMovie');
})
/* GET all users registered */
router.get('/admin/users', function(req, res, next) {
  res.render('adminUsers')
});


module.exports = router;