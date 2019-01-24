let mongoose = require('mongoose');
let config = require('../config/index');
let FakeDB = require('./FakeDB');
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

  async count(document,params){
    return await this.proxy[document].count(params);
  }

  // async addDevice(device,gateway){
  //   if(!this.checkDevice(device))
  //     return Promise.resolve(false);

  //   let devices = await PeripheralDevice.find  
  //   let pd = {
  //     _id: new mongoose.Types.ObjectId(),
  //     uid: device.uid,
  //     vendor: device.vendor,
  //     date_created: device.date_created || new Date(),       
  //     status: device.status,
  //     gateway: gateway                    
  //   }
  //   let newPeripheralDevice = PeripheralDevice(pd);
  //   newPeripheralDevice.save(err=>{
  //       if(err){
  //           console.log('error ', err);
  //           return false;
  //       }
  //   });
  // }

  checkDevice(device){
    if(!['online','offline'].includes(device.status)){
      console.log('Invalid status');
      return false;
    }
  }


  populateDB(){
    const fdb = new FakeDB();
    fdb.seedDB();
  }

  async cleanDB(){
    let p1 = Gateway.deleteMany({_id: {$ne:null}}).exec();
    let p2 = PeripheralDevice.deleteMany({_id: {$ne:null}}).exec();
    return Promise.all([p1,p2]);
  }
}

module.exports = db;