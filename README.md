# TutorUP Capstone Application

## Running Application
1. Install npm
2. Run `npm install` or `yarn install` at app root
3. Install the React app dependencies: Run `npm install` or `yarn install` within the /client folder
4. Follow Local Setup instructions (to connect to mLab mongoDB)
5. Create a keys_dev.js file in <project_root>/config folder. This will be ignored by Git so you don't commit your juicy credentials!
6. Install the useful Chrome extensions to work with React and Redux (look into not needing this to run properly!!)
- https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en
- https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en 
7. Run `npm run dev` or `yarn dev`


## About
- University of Portland students can:
1. Login/Register as a user
2. Create a profile (tutor/not tutor)
3. View/Update/Delete profiles
4. Search available tutors

## Enhancements
1. Chatroom setup
2. Serverless backend

## Technologies
- Express: Fast, flexible Node.js web application framework
- Mongoose: Models MongoDB objects for Node.js (ORM)
- React
- Redux
- Passport
- Material-UI: Google Style Library

## Local Setup
1. Create mLab account and create database, add to config/keys_dev.js

## Dependencies
- react-redux
- redux
- passport
- passport-jwt
- bcrypt
- express
- material-ui

## Look into
- Algolia (search)
- Serverless (for cloud function backend)
- * Rocket Chat * (Chatrooms! Free Slack basically)

## Testing
- `expect(component).to.have.class('something')`

## Run container in background
- `docker-compose up -d`
