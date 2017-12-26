var constants = {
    dev: {
        params: {
            location: '/Users/kim/ex1'
        },
        readings: {
            location: ''
        },
        server: {
            ip: 'localhost',
            port: 3001
        }
    },
    prod: {
        params: {
            location: '/home/pi/ex1'
        },
        readings: {
            location: '/home/pi/Programs/GPIO_sandbox/data/sensordata.db'
        },
        server: {
            ip: '192.168.1.14',
            port: 3001
        }
    }
};

module.exports = constants;