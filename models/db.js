let mongoose = require('mongoose');
let config = require('../config/index');
// let FakeDB = require('./FakeDB');
let PeripheralDevice = require('./PeripheralDevice');
let Gateway = require('./Gateway');

class db{
  constructor(){
    mongoose.connect(config.DB_URI);
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {      
      console.log('we\'re connected!');
    });   
    this.proxy = {'PeripheralDevice':PeripheralDevice,'Gateway':Gateway} 
  }

  async getAll(document){
    return await this.proxy[document].find({}).exec();
  }

  async getById(document,_id){
    return await this.proxy[document].findOne({_id}).exec();
  }

  async getDevicesByGateway(gateway){
    return await PeripheralDevice.find({gateway}).exec();
  }

  async getBy(model,params){
    return await this.proxy[model].find(params).exec();
  }

  async count(document,params){
    return await this.proxy[document].count(params);
  }

  async add(model,params){
    params._id = new mongoose.Types.ObjectId();
    let Model = new this.proxy[model](params);
    return await Model.save();
  }

  async update(model,params){
    let Model = this.proxy[model];
    return await Model.updateOne(criteria,params);
  }

  // Tank.updateOne({ size: 'large' }, { name: 'T-90' }, function(err, res) {
  //   // Updated at most one doc, `res.modifiedCount` contains the number
  //   // of docs that MongoDB updated
  // });

  async delete(model,params){
    let Model = this.proxy[model];
    return await Model.deleteOne(params);
  }

  async addDevice(device,gateway){
    // if(!this.checkDevice(device))
    //   return false;

    let devicesCount = await this.count('PeripheralDevice',{gateway});
    if(devicesCount >=10){
      console.log('error ', `There are already 10 devices on the gateway: ${gateway}`);
      return false;
    }      

    let pd = {
      _id: new mongoose.Types.ObjectId(),
      uid: device.uid,
      vendor: device.vendor,
      date_created: device.date_created || new Date(),       
      status: device.status,
      gateway: gateway                    
    }
    try{
      let newPeripheralDevice = PeripheralDevice(pd);
      let res = await newPeripheralDevice.save();
      return res;
    }
    catch(err){
      console.log(err);
      return false;
    }    
  }

  checkDevice(device){
    if(!['online','offline'].includes(device.status)){
      console.log('error ', 'Invalid status');
      return false;
    }
  }

  async cleanDB(){
    let p1 = Gateway.deleteMany({_id: {$ne:null}}).exec();
    let p2 = PeripheralDevice.deleteMany({_id: {$ne:null}}).exec();
    return Promise.all([p1,p2]);
  }
}

module.exports = db;