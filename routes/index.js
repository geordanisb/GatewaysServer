var express = require('express');
var router = express.Router();

const db_ = require('../models/db');
const db = new db_();

const fdb_ = require('../models/FakeDB');
const fdb = new fdb_();

const Auth = require('../libs/auth');
const auth = new Auth();
const verifyJWT_MW = require('../middlewares');

/* POST add/Gateway|Device. */
router.post('/add/:model', verifyJWT_MW,function(req, res, next) {
  db.add(req.params.model,req.body)
  .then(d=>res.json(d))
  .catch(e=>res.json(e))
});

/* POST get/Gateway|Device. */
router.post('/get/:model', async function(req, res, next) {
  let r = await db.get(req.params.model,req.body);
  res.json(r);
});

/* POST delete/Gateway|Device. */
router.post('/delete/:model', verifyJWT_MW,async function(req, res, next) {
  let r = await db.delete(req.params.model,req.body);
  res.json(r);
});

/* POST count/Gateway|Device. */
router.post('/count/:model', async function(req, res, next) {
  let r = await db.count(req.params.model,req.body);
  res.json(r);
});

/* POST update/Gateway|Device. */
router.post('/update/:model', verifyJWT_MW,function(req, res, next) {
  let _id = req.body._id;
  db.update(req.params.model,_id,req.body)
  .then(d=>res.json(d))
  .catch(err=>res.json(err));
});

/* GET populating database. */
router.post('/populateDB', verifyJWT_MW,function(req, res, next) {
  fdb.seedDB();
  res.send('database populated');
});

/* GET removing database. */
router.post('/cleanDB', verifyJWT_MW,function(req, res, next) {
  db.cleanDB().then(d=>console.log(d));
  res.send('database cleaned');
});


// /* POST gateway add. */
// router.post('/gateway/add', function(req, res, next) {
//   let g = {
//     serial_number: req.body.serial_number,
//     name: req.body.name,
//     ipv4: req.body.ipv4
//   };
//   db.add('Gateway',g).then(d=>{
//     res.json(d);    
//   }).catch(err=>{
//     console.log(req.body)
//     res.json(err);
//   });
// });

// /* POST device add. */
// router.post('/gateway/update', function(req, res, next) {
//   let {serial_number,name,ipv4} = req.body;
//   let g = {serial_number,name,ipv4};
//   db.update('Gateway',req.body._id,g)
//   .then(d=>res.json(d))
//   .catch(err=>res.json(err));
// });

// /* GET gateways count. */
// router.get('/gateway/count', function(req, res, next) {
//   db.count('Gateway',{}).then(d=>{
//     res.json(d);    
//   });
// });

// /* GET gateways. */
// router.get('/gateway', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//     db.getAll('Gateway').then(d=>{
//       res.json(d);    
//     })
    
// });

// /* GET gateway by _id. */
// router.get('/gateway/:_id', async function(req, res, next) {
//     let r = await db.getById('Gateway',req.params._id);
//     res.json(r);
// });


// /* POST device add. */
// router.post('/device/add', async function(req, res, next) {
//   let pd = {
//     uid: req.body.uid,
//     vendor: req.body.vendor,
//     // date_created: new Date(),    
//     status:req.body.status,
//     gateway: req.body.gateway
//   };
//   let r = await db.addDevice(pd)
//   res.json(r);
//   // db.addDevice(pd)
//   // .then(d=>res.json(d))
//   // .catch(err=>res.json(err));
// });

// /* POST device add. */
// router.post('/device/update', function(req, res, next) {
//   let pd = {
//     uid: req.body.uid,
//     vendor: req.body.vendor,
//     // date_created: new Date(),    
//     status:req.body.status,
//     gateway: req.body.gateway
//   };
//   db.update('PeripheralDevice',req.body._id,pd)
//   .then(d=>res.json(d))
//   .catch(err=>res.json(err));
// });

// /* GET peripherals devices delete. */
// router.get('/device/delete/:_id', async function(req, res, next) {
//   let _id = req.params._id;
//   let r = db.delete('PeripheralDevice',{_id});
//   res.json(r);
// });

// /* GET peripherals devices count. */
// router.get('/device/count', function(req, res, next) {
//   db.count('PeripheralDevice',{}).then(d=>{
//     res.json(d);    
//   });
// });

// /* GET peripherals devices. */
// router.get('/device', function(req, res, next) {
//     db.getAll('PeripheralDevice').then(d=>{
//       res.json(d);    
//     })    
// });

// /* GET peripheral device by _id. */
// router.get('/device/:_id', function(req, res, next) {
//   db.getById('PeripheralDevice',req.params._id).then(d=>{
//     res.json(d);    
//   });
// });

// /* POST peripherals devices by params. */
// router.post('/device', function(req, res, next) {
//   console.log(req.body)
//   db.getBy('PeripheralDevice',req.body)
//   .then(d=>res.json(d))
//   .catch(e=>res.json(e));
// });




module.exports = router;
