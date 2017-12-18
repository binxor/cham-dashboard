var constants = {
    dev: {
        params: {
            location: '/Users/kim/ex1'
        },
        readings: {
            location: ''
        }
    },
    prod: {
        params: {
            location: '/home/pi/ex1'
        },
        readings: {
            location: '/home/pi/Programs/GPIO_sandbox/data/sensordata.db'
        }
    }
};

module.exports = constants;