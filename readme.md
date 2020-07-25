# Map routing of a fixed path using leaflet with tiles from openstreetmap API
Application built with React.js v16 as frontend, Express on top of Node.js as backend abd MongoDB as the database.

## Prerequisites

1. You should have node and npm installed on your local machine. <br />
2. You should have MongoDB installed on your machine<br />
	refer: https://mongodb.github.io/node-mongodb-native/3.4/quick-start/quick-start/

## Running the application

1. Pull the project to your local machine, or download the .zip folder <br />
    &emsp;a. open terminal/cmd in 'frontend' folder and run command 'npm install'<br />
    &emsp;b. open terminal/cmd in 'backend' folder and run command 'npm install'<br />
    &emsp;c. open terminal/cmd in 'frontend' folder and run command 'npm start' <br />
	&emsp;&emsp;You should now be running an instance of frontend on port: http://localhost:8080/ <br />
    &emsp;d. open terminal/cmd in 'backend' folder and run command 'node app.js' <br />
	&emsp;&emsp;You should now be running an instance of backend on port: http://localhost:3000/ <br />

2. Initializing MongoDB<br />
    &emsp;a. In terminal/cmd, run command 'mongod' to start the instance of MongoDB<br />
	&emsp;b. In terminal/cmd, run command 'mongo' to open the MongoDB shell<br />
	&emsp;c. In the mongo terminal/cmd, run command 'use myMapDB' to initialte the collection<br />

Thats it! You should be able to access the application on port http://localhost:8080/