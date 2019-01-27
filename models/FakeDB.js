let Gateway = require('../models/Gateway');
let Device = require('../models/Device');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let db_ = require('../models/db');
let db = new db_();

module.exports = class FakeDB{
    constructor(){
        this.Gateways = [
            {
                _id: new mongoose.Types.ObjectId(),
                serial_number: "a1",
                name: "Google Gateway",
                ipv4: "172.217.2.206"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                serial_number: "b2",
                name: "Facebook Gateway",
                ipv4: "31.13.67.35"                                
            },
            {
                _id: new mongoose.Types.ObjectId(),
                serial_number: "c3",
                name: "Musala Soft",
                ipv4: "193.17.229.200"                
            }
        ];
    }
    pushGatewaysToDB(){
        
        for(let [k,g] of this.Gateways.entries()){
            let newGateway = Gateway(g);
            newGateway.save(err=>{
                if(err){
                    console.log('error ', err);
                    return false;
                }
                        
                let vendors = ['Google','Musala Soft','Apple','Mircrosoft','Facebook'] ;
                let fnRandomPos = (min,max) => Math.floor(Math.random() * (max - min)) + min;
                let status = ['offline','online']; 
                for(let i of [...Array(10).keys()]){
                    let pd = {
                        _id: new mongoose.Types.ObjectId(),
                        uid: parseInt(`${k}${i}`),
                        vendor: vendors[fnRandomPos(0,4)],
                        // date_created: new Date(),    
                        status:status[fnRandomPos(0,1)],
                        gateway: newGateway._id                    
                    }

                    db.addDevice(pd,newGateway._id)
                        .then(d=>console.log(d))
                        .catch(e=>console.log(e));                    
                }                             
            });
        }        
    }
    seedDB(){
        this.pushGatewaysToDB();
    }
}
