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
7. Install nodemon globally (will basically need it for server development, for instant server reloading) `npm i -g nodemon`
8. Run `npm run dev` or `yarn dev`

## IMPORTANT
- When adding new npm module best thing is to delete the package-lock.json and do npm install again. Then add your package :)


## About
- University of Portland students can:
1. Login/Register as a user
2. Create a profile (tutor/not tutor)
3. View/Update/Delete profiles
4. Search available tutors

## Profile Info
- Handle (user's email without @domain.com suffix)
- Classes (classes user is available to tutor for)
- Status (grade level: Freshman, Sophomore, Junior, Senior)
- More? TBD

## Enhancements
1. Chatroom setup
2. Serverless backend

## Quick Notes
- Server-side backend stuff is in root
- Client-side frontend stuff is in /client folder
- Concurrency is an installed dependency that allows you to run both -ends at once with single command
- If you make any new config files with important credentials add it to the .gitignore before pushing to Git

## Technologies
- Express: Fast, flexible Node.js web application framework
- Mongoose: Models MongoDB objects for Node.js (ORM)
- React
- Redux
- Passport
- Material-UI: Google Style Library

## Testing Technologies
- Mocha: JS framework for Node.js that allows async testing
- Chai: Assertion lib used for testing HTTP requests

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
