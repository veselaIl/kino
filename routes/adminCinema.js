
var express = require('express');
var ObjectId = require('mongodb').ObjectId; 
var router = express.Router();
var fs = require('fs');
var path = require('path');


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
  router.get('/admin/api/cinema/:id/:zala', function(req, res){
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
  router.post('/admin/api/cinema/add', function(req, res){
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
            image: '/images/cinemas/'+ req.body.cinema.image,
            coordinates: req.body.cinema.coordinates,
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
  // ADD CINEMA ZALA
  router.post('/admin/api/cinema/zala/add/:kinoID', function(req, res){
     var id; 
     var cinema = req.db.get('cinema');
     cinema.findOneAndUpdate({ kinoID : +req.params.kinoID}, {$push : {zali : { zala : req.body.zala }}})
      .then(function(cinema){
        
      })
      .catch(function (err){
        res.status(err.status || 500)
      })
  })
  //  GET PROJECTIONS IN CINEMA 
  router.get('/admin/api/cinema/projections/:id', function(req, res){
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

router.post('/admin/api/cinema/delete/:kinoID/:zalaID', function (req, res){
    console.log(req.params);
    //remove({ _id : ObjectId(req.params.id)})
    req.db.get('kino').findOneAndUpdate({ kinoID : +req.params.kinoID }, {$pull : { zalaID : +req.params.zalaID }}, {multiple:true}) 
      .then(function (data){
        console.log(data);
        res.json({ data : data });
      })
      .catch(function (err){
        res.status(err.status || 405)
      })
  })
  
  router.post('/admin/api/cinema/delete/:kinoID', function (req, res){
    req.db.get('kino').remove({kinoID : +req.params.kinoID}) 
      .then(function (data){
        console.log(data);
        res.json({ data : data });
      })
      .catch(function (err){
        res.status(err.status || 405)
      }) 
  })

//ADMIN USER
router.get('/admin/logout', function (req, res){
  console.log(req.session);
  if (req.session.user) {
      req.session.destroy(function (err) {
          console.log('destroy', err);
          res.clearCookie('connect.sid');
          res.sendStatus(err ? 500 : 200);
      });
  } else {
      res.sendStatus(401);
  }
});


module.exports = router;
  