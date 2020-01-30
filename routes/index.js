var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var journeyModel=require('../models/journey');
var userModel=require('../models/user');


var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]


/* PAGE D'ACCUEIL */
router.get('/', function(req, res, next) {
  res.render('login');
});


/* RECHERCHE DE VOYAGES */
router.post('/recherche', async function(req, res, next) {
  var depart=req.body.depart;
  var arrivee=req.body.arrivee;
  var date=req.body.date;
  console.log(depart, arrivee, date)

  var dispo= await journeyModel.find(
    {departure: req.body.depart, arrival: req.body.arrivee, date: req.body.date}
  )
  
  if(dispo){
    res.render('choix', {dispo});
  } else {
    res.render('error');
  }
  
});

/* CHOIX */
router.get('/choix', function(req, res, next) {

  res.render('panier');
});

/* HISTORIQUE */
router.get('/historique', function(req, res, next) {

  res.render('historique');
});



module.exports = router;
