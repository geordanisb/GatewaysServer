# GatewaysServer
Developed using express-generator

# Config
config / index.js => config of the app

# Database
database => mongodb
Connection
    1-online => mlab
    2-local => docker container => mongo
FakeDB => allow populate and clean the database to test; required authentication 

# Auth
Developed using jasonwebtoken + bcrypt
libs => auth.js
middleware.js => verify if a JWTToken exist

# Requirements
1-npm install

# To run (npm start) and test using Postman o curl
1-Register a user http://127.0.0.1:8000/users/register (to see the user created: http://127.0.0.1:8000/get/User, check that not payload in request.boy are sent otherwise it will be used to get the user and password mistmacth because is hashed in db)

2-Log in http://server:port/users/login and copy the token result;

3-Populate the database with fake data in http://127.0.0.1:8000/populateDB (paste the token result in Headers => Authorization => Bearer token).

4-List all Gateways created using: http://127.0.0.1:8000/get/Gateway (check not payload in request.body are sent).

5-List all Device: http://127.0.0.1:8000/get/Device with not payload request.body

6-List all Device by gateway: http://127.0.0.1:8000/get/Device with the payload gateway with the _id of a any Gateway.

7-Count Device by Gateway: http://127.0.0.1:8000/count/Device with the payload gateway with the _id of a any Gateway.

8-Delete Device: http://127.0.0.1:8000/delete/Device with the payload _id_ with the _id of a any Device.

