let mongoose = require('mongoose');
let config = require('../config/index');
// let FakeDB = require('./FakeDB');
let Device = require('./Device');
let Gateway = require('./Gateway');
let User = require('./User');

class db{
  constructor(){
    mongoose.connect(config.DB_URI);
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {      
      console.log('we\'re connected!');
    });   
    this.proxy = {
      'Device': Device,
      'Gateway': Gateway,
      'User': User
    } 
  }

  async add(model,params){
    params._id = new mongoose.Types.ObjectId();
    if(model !== 'Device'){
      let Model = new this.proxy[model](params);
      return await Model.save();
    }
    else{
      return await this.addDevice(params,params.gateway);
    }
      
  }

  async update(model,_id,params){
    let Model = this.proxy[model];
    return await Model.updateOne({_id},params).exec();
  }

  async get(model,params){
    return await this.proxy[model].find(params).exec();
  }

  async delete(model,params){
    let Model = this.proxy[model];
    return await Model.deleteOne(params);
}

  async count(model,params){
    return await this.proxy[model].count(params);
  }

  // async getAll(document){
  //   return await this.proxy[document].find({}).exec();
  // }

  // async getById(document,_id){
  //   return await this.proxy[document].findOne({_id}).exec();
  // }

  // async getDevicesByGateway(gateway){
  //   return await Device.find({gateway}).exec();
  // }



  async addDevice(device,gateway){
    
    let oldGateway = await this.get('Gateway',{_id:gateway});
    if(!oldGateway)
      return {error:`Not saved, Gateway: ${device.gateway} not found`,ok:false};

    let devicesCount = await this.count('Device',{gateway:gateway});
    
    if(devicesCount >= config.device_by_gateway){
      return {ok:false,error:`There are already ${config.device_by_gateway} devices on the gateway: ${gateway}`};
    }

    try{
      console.log(device)
      let newDevice = new Device(device);
      return await newDevice.save();
    }
    catch(error){      
      return {error,ok:false};
    }    
  }

 async cleanDB(){
    let p1 = Gateway.deleteMany({_id: {$ne:null}}).exec();
    let p2 = Device.deleteMany({_id: {$ne:null}}).exec();
    return Promise.all([p1,p2]);
  }
}

module.exports = db;