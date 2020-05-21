# Cham Dashboard
A React.js + Node.js proof-of-concept mini dashboard for environmental conditions like temperature, humidity, and light readings.

Keep your cham happy - at a glance you can easily see current readings and whether they are in tolerance (config-driven!).  

The interactive graph shows readings over the last day, week, etc.

## Building an Embedded System

With this full-stack app, I built an integrated embedded system with a raspberry pi and sensor array.  The hardware is running additional software (written in python) to take regular readings from the sensor array and store them directly in the app's sqlite3 database.


## Getting Started
### Preinstall

_Before continuing, you will need to install node, npm, sqlite3.  Here are the versions I used._  
> `node: 8.6.0`
> `npm: 5.3.0`
> `sqlite3: 3.1.13`

### Decide Whether to Serve Over HTTPS (Recommended, Secure) or HTTP
Set up HTTPS certificates (secure), or disable HTTPS (insecure).  HTTPS is enabled by default, but you must generate the certificates below.

#### A. To Serve Over HTTPS (Secure)

##### Generate your SSL certificates in the `.cert` directory.
Create RSA password key file

	  cd .cert; openssl genrsa -des3 -passout pass:${password} -out server.pass.key 2048

Successful output will look similar to this:

	  Generating RSA private key, 2048 bit long modulus (2 primes)
	  .+++++
	  ..+++++
	  e is 65537 (0x010001)
	

##### Create PEM RSA server private key

	  openssl rsa -passin pass:${password} -in server.pass.key -out server.key
	
Successfull output will look similar to this:
	
	  writing RSA key
	
#####  Create CSR using RSA private key
  
	  openssl req -new -key server.key -out server.csr
	
Answer the following dialog questions to complete setup:
	
	  You are about to be asked to enter information that will be incorporated
	  into your certificate request.
	  What you are about to enter is what is called a Distinguished Name or a DN.
	  There are quite a few fields but you can leave some blank
	  For some fields there will be a default value,
	  If you enter '.', the field will be left blank.
	  -----
	  Country Name (2 letter code) [AU]:
	  State or Province Name (full name) [Some-State]:
	  Locality Name (eg, city) []:
	  Organization Name (eg, company) [Internet Widgits Pty Ltd]:
	  Organizational Unit Name (eg, section) []:
	  Common Name (e.g. server FQDN or YOUR name) []:
	  Email Address []:
	  
	  Please enter the following 'extra' attributes
	  to be sent with your certificate request
	  A challenge password []:
	  An optional company name []:

#### B. To Disable HTTPS (Insecure)
This is not recommended for production apps!  If you wish to disable HTTPS, you must *manually* comment or remove the HTTPS environment variable by deleting this line in the `.env` file:

```
# HTTPS=true    ## Comment or remove this line
```

### Setup
> Complete the HTTP/HTTPS setup steps above first.  If you skip it, your app will not run correctly.

1. Set up your database.  This project includes the sqlite3 `.db` file you'll need to create the database and populate the necessary tables.

```
$ sqlite3 data/sensordata.db 
```

2. Install dependencies
```
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
This full-stack app is built in React.js and Node.js, and uses SQLite3. Sensor data is collected via Python3.

Demo data is included in the `data` folder.