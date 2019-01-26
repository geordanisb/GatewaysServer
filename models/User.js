let mongoose = require('mongoose'); 
let validator = require('validator');

let UserSchema = new mongoose.Schema({  
  name: {type:String,required:true},
  email: {
      type:String,
      unique: true,
      validate: (value)=>validator.isEmail(value)
  },
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');