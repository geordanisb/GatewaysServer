const bcrypt = require('bcrypt');
const salts = 5;
const password = '123';

let encrypt = async(password,salts)=>{
    return await bcrypt.hash(password,salts);
}

let decrypt = async(password,hash)=>{
    return await bcrypt.compare(password,hash);    
}

encrypt(password,salts).then(d=>console.log(d));

decrypt(password,'$2b$05$9WAD0/1SIAX8w1E4KJzMNOE./6/awXyTlrh4fzVWAVhFInm0OGFHi')
.then(d=>console.log(d));

const PING = (ipv4)=>{
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

PING('127.0.0.3').then(d=>console.log(d)).catch(e=>console.log(e));
let res = PING('192.168.88.140').then(d=>console.log(d)).catch(e=>console.log(e));
