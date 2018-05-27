
var express = require('express');
var ObjectId = require('mongodb').ObjectId; 
var router = express.Router();

/********* CINEMA *********** */
/* GET admin cinemas page. */
router.get('/admin/api/cinema', function(req, res) {
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

  cinemaDB = req.db.get('kino');
  cinemaDB.count().then( function (id){
    if (req.body) {
      cinema = {
        kinoID : ++id,
        name : req.body.cinema.name,
        address : req.body.cinema.address,
        //adding fields for image and phone number 
        image: req.body.cinema.image,
        coordinates: req.body.cinema.coordinates,
        phoneNumber: req.body.cinema.phoneNumber,
        zali : req.body.cinema.zali
      }
      cinemaDB.insert(cinema)
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
  })
});

// ADD CINEMA ZALA
router.post('/admin/api/cinema/zala/add/:kinoID', function(req, res){
    var id; 
    var cinemaDB = req.db.get('kino'); 
    cinemaDB.find({ kinoID : +req.params.kinoID},{ _id: 0 ,zali : 1 })
      .then(function(data){
        if(data[0].zali.length > 0){
          var id = data[0].zali.sort((a,b) => b.zalaID - a.zalaID)[0].zalaID;
        }
        zala = {
          zalaID : ++id || 1,
          space : req.body.zala.space,
          capacity: req.body.zala.capacity
        };
        cinemaDB.update({kinoID : +req.params.kinoID}, {$push: { zali : zala }})
          .then(function (data){
            res.json({ text  : 'You successfully added nez zala' });
          })
          .catch(function (err){
            res.sendStatus(500);
          })
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
// DELETE ZALA IN CINEMA
router.post('/admin/api/cinema/delete/:kinoID/:zalaID', function (req, res){
  console.log(req.params);
  if (req.params.kinoID && req.params.zalaID){
      var removeObj = { $and : [{kinoID : +req.params.kinoID, zalaID : +req.params.zalaID}]} ;
      req.db.get('kino').update({ kinoID : +req.params.kinoID }, {$pull : { zali : { zalaID : +req.params.zalaID }}}, false, true ) 
        .then(function (data){
          req.db.get('projection').remove({$and :[{kinoID: req.params.kinoID},{zalaID : req.params.zalaID}]})
            .then(function (data){
              console.log(data);
              res.json({ text: 'You successfully deleted cinema zala!'});
            })
        })
        .catch(function (err){
          res.status(err.status || 405)
        })
    } else {
      res.sendStatus(400);
    }
  })

//edit zala
router.post('/admin/api/cinema/zala/edit/:kinoID', function (req, res){
  req.db.get('kino').findOneAndUpdate({ kinoID : +req.params.kinoID},{ $set: { zali : { zala : req.body.zala}}})
    .then(function (data){
      if (data){
        res.json({ text: 'You successfully edited zala'})
      } else {
        res.sendStatus(405);
      }                           
  })
})
// DELETE CINEMA

router.post('/admin/api/cinema/delete/:kinoID', function (req, res){

  if (req.params.kinoID){
    req.db.get('kino').remove({kinoID : +req.params.kinoID}) 
    .then(function (data){
      res.json({ text: 'You successfully deleted Cinema!' });       
    })
    .catch(function (err){
      res.status(err.status || 405)
    })
  
  } else {
    res.sendStatus(400);
  }
    
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
  