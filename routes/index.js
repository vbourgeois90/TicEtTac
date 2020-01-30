var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var journeyModel=require('../models/journey');
var userModel=require('../models/user');


var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]


/* PAGE D'ACCUEIL */
router.get('/', function(req, res, next) {
  res.render('index');
});


/* LANCER LA RECHERCHE */

module.exports = router;
