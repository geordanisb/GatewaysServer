let Gateway = require('../models/Gateway');
let PeripheralDevice = require('../models/PeripheralDevice');
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
                name: "Phone 1",
                ipv4: "192.160.88.140"
            },
            {
                _id: new mongoose.Types.ObjectId(),
                serial_number: "b2",
                name: "Phone 2",
                ipv4: "192.168.88.135"                                
            },
            {
                _id: new mongoose.Types.ObjectId(),
                serial_number: "c3",
                name: "Phone 3",
                ipv4: "192.168.88.180"                
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
                        // _id: new mongoose.Types.ObjectId(),
                        uid: parseInt(`${k}${i}`),
                        vendor: vendors[fnRandomPos(0,4)],
                        // date_created: new Date(),    
                        status:status[fnRandomPos(0,1)],
                        gateway: newGateway._id                    
                    }

                    db.addDevice(pd,newGateway._id)
                        .then(d=>console.log(d))
                        .catch(e=>console.log(e));

                    // let newPeripheralDevice = PeripheralDevice(pd);
                    // newPeripheralDevice.save(err=>{
                    //     if(err){
                    //         console.log('error ', err);
                    //         return false;
                    //     }
                    // });
                    
                } 
                            
            });
        }        
    }
    seedDB(){
        this.pushGatewaysToDB();
    }
}
