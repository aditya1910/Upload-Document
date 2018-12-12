# Upload-Document

There are 2 folders associated with it 

I. client for the frontent 
to setup client 

1. cd client 
2. yarn install
3. yarn start


II. backEndApi fro the REST API
to setup backEndApi

1. cd backEndApi
2. npm install
3.npm start or nodemon

System requirements 

Node version 8.11.3 or greater 
MongoDb 3.4 or greater 

Implemented Functionalities are 

1. Upload the csv file and it will ingest that file and store the data in databas
2. Service to keep track if the ingest is processed or not
3. Login signup process using JWT tokens not very secured but just to get an idea how it works.  
4. Middleware is implemented for checking if the request is a valid request or not. 
5. Need to create the user before making any login 
6. The document will be created if there is no docuemnt in db
7. Access controle (Locks on the docuemnt and user won't be able to edit or change the lock unles the lock is released by the authorized user)



