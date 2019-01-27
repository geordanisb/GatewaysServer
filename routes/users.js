const express = require('express');
const router = express.Router();
const config = require('../config');

const Auth = require('../libs/auth');
const auth = new Auth();

const verifyJWT_MW = require('../middlewares');

const db_ = require('../models/db');
const db = new db_();

/* GET users listing. */
router.post('/', verifyJWT_MW,function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/unregister', (req,res)=>{
  let {email, password} = req.body;
  db.delete('User',{email})
  .then(d=>res.json(d))
  .catch(e=>res.json(e));
});

router.post('/register', function(req, res) {
  let {name, email, password} = req.body;
  db.add('User',{name, email, password})
  .then(d=>res.json(d))
  .catch(error=>res.json(error));

});

router.post('/login', async function(req, res) {
  let {email,password} = req.body;
  let logingRes = await auth.login(email,password);
  res.json(logingRes)
  
});

module.exports = router;
