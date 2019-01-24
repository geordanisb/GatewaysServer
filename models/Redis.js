var redis = require('redis');
var client = redis.createClient();


module.exports = class Redis{
    constructor(){
        client.on('connect', function() {
            console.log('Redis client connected');
        });
        
        client.on('error', function (err) {
            console.log('Something went wrong ' + err);
        });
        
        client.set('my test key', 'my test value', redis.print);
        client.get('my test key', function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            console.log('GET result ->' + result);
        });        
    }

    test(){
        var redis = require('redis');
  var client = redis.createClient();
  client.on('connect', function() {
    console.log('Redis client connected');
  });
    let Gateways = [
      {id:1,name:'asd'},
      {id:2,name:'1asd'}
    ]
    // let GatewaysIds = [];
    for(let p of Gateways){
      client.set(`Gateway-${p.id}`, JSON.stringify(p), redis.print);

    //   // client.get(`Gateways`,function(err,res){
    //   //   console.log(res,'Gateways')
    //   // });
    //   GatewaysIds.push(p.id)
      
    }
    // client.set(`Gateways`, JSON.stringify(GatewaysIds), redis.print);

    client.get('Gateways', function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        let ids = JSON.parse(result);
        for(let id of ids){
          console.log(id)
          client.get(`Gateway-${id}`,(err,res)=>{
            console.log(res)
          })
        }
        

    });

    }
}