var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var journeyModel=require('../models/journey');
var userModel=require('../models/user');


var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]


/* PAGE D'ACCUEIL */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  if(!req.session.voyages){
    req.session.voyages=[];
  };
  req.session.user=undefined;
  console.log(req.session.voyages);
  res.render('login');
});


/* RECHERCHE DE VOYAGES */
router.post('/recherche', async function(req, res, next) {
  if(req.session.user===undefined){
    res.redirect('/')
  }
  var depart=req.body.depart;
  var arrivee=req.body.arrivee;
  var date=req.body.date;

  var dispo= await journeyModel.find(
    {departure: req.body.depart, arrival: req.body.arrivee, date: req.body.date}
  )
  
  if(dispo.length!=0){
    res.render('choix', {dispo});
  } else {
    res.render('error');
  }
  
});

/* CHOIX */
router.get('/addjourney', async function(req, res, next) {
  if(req.session.user===undefined){
    res.redirect('/')
  }
  var voyage= await journeyModel.findOne(
    {_id: req.query.voyage}
  );
  req.session.voyages.push(voyage);
  res.render('panier', {listeVoyages: req.session.voyages});
});

/* CHECKOUT */
router.get('/checkout', async function(req, res, next) {
  if(req.session.user===undefined){
    res.redirect('/')
  }
  var user=await userModel.findById(req.session.user.id);

  for(let i=0; i<req.session.voyages.length; i++){
    user.journey.push(req.session.voyages[i]);
  }
  console.log(user);

  var usersaved = await user.save();
  req.session.voyages=[];
  console.log(req.session.voyages);
  res.render('index');
});

/* HISTORIQUE */
router.get('/historique', async function(req, res, next) {
  if(req.session.user===undefined){
    res.redirect('/')
  }
  var user=await userModel.findById(req.session.user.id)
                          .populate('journey')
                          .exec();
  res.render('historique', {userJourneys: user.journey});
});

/* REDIRECTION HOMEPAGE */
router.get('/homepage', function(req, res, next) {
  res.render('index');
});

module.exports = router;
