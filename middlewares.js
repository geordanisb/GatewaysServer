const Auth = require('./libs/auth');
const auth = new Auth();

module.exports = function verifyJWT_MW(req, res, next)
{
    let authorization = req.headers.authorization;
    if(!authorization)
        res.json({ok:false,error: "Not token provided."});
    
    let authorization_data = authorization.split(' ');     
    if(authorization_data.length!=2)
        res.json({ok:false,error: "Not token provided."});

    let token = authorization_data[1];
    
    auth.verifyJWTToken(token)
    .then((decodedToken) =>
    {
        req.user = decodedToken.data;
        next();
    })
    .catch((err) =>
    {
        res.status(400)
        .json({ok:false,error: "Invalid auth token provided.", error:err});
    })    
    
    
    
//     let authorization = req.headers.authorization;
//     let authorization_data = authorization.split(' '); 

//     if(!authorization_data.length)
//         res.json({message: "Not token provided."});
//     let token = authorization[1];
//     if(!token)
//         res.json({message: "Not token provided."});
//   res.json(token);
//   auth.verifyJWTToken(token)
//     .then((decodedToken) =>
//     {
//       req.user = decodedToken.data;
//       next();
//     })
//     .catch((err) =>
//     {
//       res.status(400)
//         .json({message: "Invalid auth token provided.", error:err});
//     })
}