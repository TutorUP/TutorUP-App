# Backend Notes : all code in root folder

### Technologies
- Express : Server and routing framework for Node.js
- Mongoose : Driver that allows us to model our database objects and make queries to MongoDB
- MLab : The cloud MongoDB database we are using
- Passport : Authentication package for protecting server routes, multiple auth Strategies can be used, we are using simple JWT authentication
- Validator : Easier server-side validation for user inputs

## TLDR
- server.js : Base of the backend functionality
* MongoDB connection made with Mongoose db driver module
* Connection with authentication method (we're using Passport)
* Snippet to deploy frontend after it is built for production
- /routes/api : Folder contains all routes we are using for our REST API
