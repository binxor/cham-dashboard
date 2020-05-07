# Cham Dashboard
A React.js + Node.js proof-of-concept mini dashboard for environmental conditions like temperature, humidity, and light readings.

Keep your cham happy - at a glance you can easily see current readings and whether they are in tolerance (config-driven!).  

The interactive graph shows readings over the last day, week, etc.

## Building an Embedded System

With this full-stack app, I built an integrated embedded system with a raspberry pi and sensor array.  The hardware is running additional software (written in python) to take regular readings from the sensor array and store them directly in the app's sqlite3 database.


## Getting Started
### Setup

_Before continuing, you will need to install node, npm, sqlite3.  Here are the versions I used._  
> `node: 8.6.0`
> `npm: 5.3.0`
> `sqlite3: 3.1.13`

1. Set up your database.  This project includes the sqlite3 `.db` file you'll need to create the database and populate the necessary tables.

```sh
$ sqlite3 data/sensordata.db 
```

2. Install dependencies
```sh
$ npm i
```
3. Modify configuration to match your system
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
 

4. Start the server
```sh
$ node server/server.js
```

5. Start your app
```sh
$ npm start
```

6. Navigate to `http://localhost:3000` to see the dashboard!

## Tech Stack
This full-stack app is built in React.js, node.js, and a SQLite3 backend.

Demo data is included in the `data` folder.