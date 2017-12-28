# Cham Dashboard
A proof-of-concept mini dashboard for environmental conditions like temperature, humidity, and light readings.

Keep your cham happy - at a glance you can easily see current readings and whether they are in tolerance (config-driven!).  

The interactive graph shows readings over the last day, week, etc.

## Building an Embedded System

With this full-stack app, I built an integrated embedded system with a raspberry pi and sensor array.  The hardware is running additional software (written in python) to take regular readings from the sensor array and store them directly in the app's sqlite database.


## Getting Started
_Before continuing, you will need to install node, npm, sqlite3.  Here are the versions I used._
- node: 8.6.0
- npm: 5.3.0

0. Install dependencies
```sh
$ npm i
```
1. Modify configuration to match your system
Edit the `config/config.js` file to point to your sqlite database paths.  The `constants.dev` object is what you're interested in:
><pre>{
>   devOrProd: 'dev',
>   dev: {
>      params: {
>          location: '/path/to/ex1' //This db holds your tolerances
>      },
>      readings: {
>          location: '/path/to/dhtreadings' //This db has your sensor readings
>      } ,
>      ...
>   }
>}</pre>

	For example, on my system `dev.params.location` is set to `"~/cham-dashboard/data/sensordata.db"`.  
 

2. Start the server
```sh
$ node server/server.js
```

3. Start your app
```sh
$ npm start
```

## Tech Stack
This full-stack app is built in React.js, node.js, and a SQLite3 backend.

Demo data is included in the `data` folder.