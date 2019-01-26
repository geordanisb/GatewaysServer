var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
let User = require('../models/User');
const db_ = require('../models/db');
const db = new db_();

/* GET users listing. */
router.get('/', function(req, res, next) {
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

  try{
    bcrypt.hash(password, 8).then(hash=>{    
      let newUser = {name, email, password: hash};
      db.add('User',newUser).then(user=>{
        let token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
        return res.json({ auth: true, token });   
      })
      
    })
  }
  catch(error){res.json(error)};
  
 
});

router.post('/login', function(req, res) {
  let {email,password} = req.body;

  db.getBy('User',{email})
  .then(user=>{
    if (!user.length) 
      res.status(404).send('No user found.');
      bcrypt.compare(password, user.password).then(ok=>{
        if(!ok)
          return res.status(401).send({ auth: false, token: null,error });
        let token = jwt.sign({ id: user._id }, config.jwt_secret, {
          expiresIn: 86400 // 24 hours
        });
        return res.status(200).send({ auth: true, token });
      })
      .catch(error=>res.json(error));
  })
  .catch(error=>res.json(error));
  
});

// router.post('/login', function(req, res) {
//   /*var token = req.headers['x-access-token'];
//   if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
//   jwt.verify(token, config.secret, function(err, decoded) {
//     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
//     res.status(200).send(decoded);
//   });*/
//   let token = req.headers.authorization.split(' ')[1];
//   if(!token)
//     res.sendStatus(403).json({ auth: false, message: 'No token provided.' });
//   jwt.verify(token,config.jwt_secret, function(err, decoded){
//     if(err)res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
//   })

//   res.json(token);
// });

module.exports = router;
