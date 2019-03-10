# TutorUP Infrastructure Requirements  

## Team: Alexa Baldwin, Danh Nguyen, Elias Paraiso  


Overview: TutorUP is a responsive web app that uses a MERN (MongoDB – Express –React -NodeJS) stack. It allows students to easily connect with peer tutors. All users are required to register with their UP email address – they will not be able to log in until they click the confirmation link sent to their email.  Tutors can create profiles with information such as major, availability and the classes they are able to tutor. Non-tutor students can search for tutors by name, subject, and specific courses they can tutor. 

 

The core app is split into two simple parts: 

- Frontend – React w/ Redux state management 
- Backend – Express API server 

 

## Currently Used: 

- Site host: https://tutoruppilots.herokuapp.com/   

    - Sleeps after 30 mins of inactivity 

    - 512 MB RAM, 1 web / 1 worker 

    - Uses account-based pool of free dyno hours 

    - Custom domains 

 

- MongoDB Database: https://mlab.com/  

    - Will have to move to Mongo Atlas for production: https://www.mongodb.com/cloud/atlas  
    - MLab Logistics (Sandbox plan): 

    - 0.5 GB storage on shared database server process running on shared VM 

    - Monthly Price: FREE 

    - No expiration 

    - Continuous monitoring, 24/7 

    - Free backup restores 

 

- Mongo Atlas Logistics: 

    - Free 512 MB storage 


 