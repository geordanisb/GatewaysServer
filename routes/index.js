var express = require('express');
var router = express.Router();

let db_ = require('../models/db');
let db = new db_();



/* GET gateways. */
router.get('/gateways', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    db.getAll('Gateway').then(d=>{
      res.json(d);    
    })
    
});

/* GET gateway by _id. */
router.get('/gateway/:_id', function(req, res, next) {
    db.getById('Gateway',req.params._id).then(d=>{
      res.json(d);    
    });
});

/* GET peripherals devices. */
router.get('/devices', function(req, res, next) {
    db.getAll('PeripheralDevice').then(d=>{
      res.json(d);    
    })    
});

/* GET peripheral device by _id. */
router.get('/device/:_id', function(req, res, next) {
  db.getById('PeripheralDevice',req.params._id).then(d=>{
    res.json(d);    
  });
});

/* GET peripherals devices by gateway. */
router.get('/devicesByGateway/:gateway', function(req, res, next) {
  db.getDevicesByGateway(req.params.gateway).then(d=>{
    res.json(d);    
  });
});

/* GET populating database. */
router.get('/populateDB', function(req, res, next) {
  db.populateDB();
  res.send('database populated');
});

/* GET removing database. */
router.get('/cleanDB', function(req, res, next) {
  db.cleanDB().then(d=>console.log(d));
  res.send('database cleaned');
});

module.exports = router;
