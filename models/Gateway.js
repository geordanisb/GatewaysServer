let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let validator = require('validator');
const Tools = require('../libs/tools');


/*Each gateway has:
a unique serial number (string), 
human-readable name (string),
IPv4 address (to be validated),
multiple associated peripheral devices.*/
var gateway = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    serial_number: {type:String, unique: true, required: true},
    name: String,
    ipv4: {type:String,
      required: true, 
      validate: (value) => {
        return validator.isIP(value);
      }
    },
    peripheral_device : [{ type: Schema.Types.ObjectId, ref: 'PeripheralDevice' }],
    createdAt: {type: Date, default: Date.now },
  });

  
  gateway.pre('save',async function(next){
    let self = this;
    let res = await Tools.PING(self.ipv4);
    if(res)
      next();
    else
      next(new Error('IP unreachable'))
    /*.then(d=>{
      if(d)
        next();
    })
    .catch(err=>{
      next(new Error(err))
    });*/
  
  })
  module.exports = mongoose.model('Gateway', gateway);
  
