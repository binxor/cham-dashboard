var constants = {
    devOrProd: 'dev',
    local: {
        params: {
            location: '../data/ex1'
        },
        readings: {
            location: '../data/sensordata.db'
        },
        server: {
            ip: 'localhost',
            port: 3001
        }
    },
    dev: {
        params: {
            location: '../data/ex1'
        },
        readings: {
            location: '../data/sensordata.db'
        },
        server: {
            ip: '10.0.0.13',
            port: 3001
        },
        firebaseURL: 'https://YOUR_FIREBASE_URL'
    },
    prod: {
        params: {
            location: '../data/ex1'
        },
        readings: {
            location: '../data/sensordata.db'
        },
        server: {
            ip: '98.246.239.190',
            port: 3001
        }
    }
};

module.exports = constants;
