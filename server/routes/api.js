const express= require('express');
const router = express.Router();
const Poll = require('../models/poll');
const User = require('../models/user');


//get all
router.get('/poll', function(req, res, next){
  Poll.find({}).then(function(result){
    res.send(result);
  }).catch(next);
});



//get user polls
router.get('/poll/:id', function(req, res, next){
  Poll.find({"creator.id": req.params.id})
  .then(function(product){
    res.send(product)
  }).catch(next);
})

router.post('/poll', function(req, res, next){
  Poll.create(req.body).then(function(Product){
    res.send(Product);
  }).catch(next)
});

router.put('/poll/:id', function(req, res, next){
  console.log("poll init", req.body)
    Poll.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Poll.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    }).catch(next);
});

router.delete('/poll/:id', function(req, res, next){
  Poll.findByIdAndRemove({_id: req.params.id}).then(function(del){
    res.send(del);
  }).catch(next);
})

//user
router.get('/user', function(req, res, next){
  User.find().then(function(result){
    res.send(result);
  }).catch(next);
});
//find user
router.get('/user/:id', function(req, res, next){
  User.findOne({id:req.params.id}).then(function(result){
    // res.send(result);
    if(!result){
      res.status(404);
      res.send("none");
    }
    else{
      res.send(result)
    }
  }).catch(next);
});

//create
router.post('/user', function(req, res, next){
  console.log(req.body)
  User.create(req.body).then(function(create){
    res.send(create);
  }).catch(next)
});
//update
router.put('/user/:id', function(req, res, next){
  console.log("user update", req.body)
    User.findOneAndUpdate({id: req.params.id}, req.body).then(function(){
        User.findOne({id: req.params.id}).then(function(user){
            res.send(user);
        });
    }).catch(next);
});
//delete
router.delete('/user/:id', function(req, res, next){
  User.findByIdAndRemove({_id: req.params.id}).then(function(del){
    res.send(del);
  }).catch(next);
})

module.exports = router;
