var express = require('express');
var router = express.Router();

var userModel = require('../models/user')

// SIGN-UP

router.post('/sign-up', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.email
  })
  
console.log(req.body);

  if(!searchUser){
    var newUser = new userModel({
      firstName: req.body.firstName.toLowerCase(),
      lastName: req.body.lastName.toLowerCase(),
      email: req.body.email,
      password: req.body.password,
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      firstName: newUserSave.firstName,
      lastName: newUserSave.lastName,
      id: newUserSave._id
    }
  
    console.log(req.session.user)
  
    res.redirect('/homepage')
  } else {
    res.redirect('/')
  }
  
})

router.post('/sign-in', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.email,
    password: req.body.password
  })

  if(searchUser!= null){
    req.session.user = {
      firstName: searchUser.firstName,
      lastName: searchUser.lastName,
      id: searchUser._id
    }
    res.redirect('/homepage')
  } else {
    res.render('login')
  }

  
})

router.get('/logout', function(req,res,next){

  req.session.user = null;

  res.redirect('/')
})


module.exports = router;

