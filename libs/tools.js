module.exports = class Tools{
    static PING(ipv4){
        return new Promise( (resolve, reject) => {            
            let exec = require('child_process').exec
            exec(`ping ${ipv4} -c 6`, (function (error, stdout, stderr) {
                if (error) {
                    console.error("exec", "-> ", error, stderr)
                    resolve(false);
                    
                } else {
                    console.log("exec", "-> ", stdout, stderr)
                    resolve(true);                
                }
            }))
            return;  
          })
    }
}