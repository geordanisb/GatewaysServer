let mongoose = require('mongoose'); 
let validator = require('validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let UserSchema = new mongoose.Schema({  
  name: {type:String,required:true,unique: true,},
  email: {
      type:String,
      unique: true,
      validate: (value)=>validator.isEmail(value)
  },
  password: {type:String,required:true}
});

UserSchema.pre('save',function(next){
  let self = this;
  bcrypt.hash(self.password, saltRounds, function(err, hash) {
    if(!err){
      self.password = hash;
      next();
    }
    else next(new Error(err));
  });
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');