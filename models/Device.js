let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let validator = require('validator');

/*Each peripheral device has:
a UID (number),
vendor (string),
date created,
status - online/offline.
*/
var Device = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    uid: {type:Number, unique: true, required: true},
    vendor: {type:String, required: true},
    date_created: {type: Date},    
    status:{
      type:String, 
      required:true,
      validate: (value)=> validator.isIn(value,['online','offline'])
    },
    gateway: { type: Schema.Types.ObjectId, ref: 'Gateway', required:true }    
  });

  module.exports = mongoose.model('Device', Device);  