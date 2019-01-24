var express = require('express');
var router = express.Router();

const db_ = require('../models/db');
const db = new db_();

const fdb_ = require('../models/FakeDB');
const fdb = new fdb_();



/* POST gateway add. */
router.post('/gateway/add', function(req, res, next) {
  let g = {
    serial_number: req.body.serial_number,
    name: req.body.name,
    ipv4: req.body.ipv4
  };
  db.add('Gateway',g).then(d=>{
    res.json(d);    
  }).catch(err=>{
    console.log(req.body)
    res.json(err);
  });
});

/* GET gateways count. */
router.get('/gateway/count', function(req, res, next) {
  db.count('Gateway',{}).then(d=>{
    res.json(d);    
  });
});

/* GET gateways. */
router.get('/gateway', function(req, res, next) {
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


/* POST device add. */
router.post('/device/add', function(req, res, next) {
  let pd = {
    uid: req.body.uid,
    vendor: req.body.vendor,
    // date_created: new Date(),    
    status:req.body.status,
    gateway: req.body.gateway
  };
  db.add('PeripheralDevice',pd)
  .then(d=>res.json(d))
  .catch(err=>res.json(err));
});
//TODO
/* POST device add. */
router.post('/device/update', function(req, res, next) {
  let pd = {
    uid: req.body.uid,
    vendor: req.body.vendor,
    // date_created: new Date(),    
    status:req.body.status,
    gateway: req.body.gateway
  };
  db.update('PeripheralDevice',pd)
  .then(d=>res.json(d))
  .catch(err=>res.json(err));
});

/* GET peripherals devices delete. */
router.get('/device/delete/:_id', function(req, res, next) {
  let _id = req.params._id;
  console.log(req.params)
  db.delete('PeripheralDevice',{_id})
  .then(d=>res.json(d))
  .catch(e=>res.json(e));
});

/* GET peripherals devices count. */
router.get('/device/count', function(req, res, next) {
  db.count('PeripheralDevice',{}).then(d=>{
    res.json(d);    
  });
});

/* GET peripherals devices. */
router.get('/device', function(req, res, next) {
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

/* POST peripherals devices by params. */
router.post('/device', function(req, res, next) {
  console.log(req.body)
  db.getBy('PeripheralDevice',req.body)
  .then(d=>res.json(d))
  .catch(e=>res.json(e));
});


/* GET populating database. */
router.get('/populateDB', function(req, res, next) {
  fdb.seedDB();
  res.send('database populated');
});

/* GET removing database. */
router.get('/cleanDB', function(req, res, next) {
  db.cleanDB().then(d=>console.log(d));
  res.send('database cleaned');
});

module.exports = router;
