const jwt = require('jsonwebtoken');
const _ = require('lodash');
const config = require('../config/index');
const db_ = require('../models/db');
const db = new db_();
const bcrypt = require('bcrypt');

module.exports = class Auth{

  async encrypt(password,salts){
    return await bcrypt.hash(password,salts);
  }

  async decrypt(password,hash){
    return await bcrypt.compare(password,hash);    
  }

  async login(email,password){
    let users = await db.get('User',{email});
      
    if(users.length){
      let user = users[0];
      // return {password,hash:user.password};
      let res = await this.decrypt(password,user.password);      
      if(res)
        return {ok:true, token:this.createJWToken({_id:user._id,name:user.name})};
      // return {ok:true,u};
    }
    
  }

  verifyJWTToken(token) 
  {
    return new Promise((resolve, reject) =>
    {
      jwt.verify(token, config.jwt_secret, (err, decodedToken) => 
      {
        if (err || !decodedToken)
          return reject(err);
        resolve(decodedToken);
      })
    })
  }  

  createJWToken(details)
  {
    let token = jwt.sign(details, config.jwt_secret, {
        expiresIn: '8h',
        algorithm: 'HS256'
    });
    return token
  }
}
