var bunyan = require('bunyan');
const fs = require('fs');
const { INFO } = require('bunyan');
//var log = bunyan.createLogger({ name: "blogitout" });

var log = bunyan.createLogger({
    name: 'blogitout',
    stream: process.stdout,
    level: 'debug',
    serializers: bunyan.stdSerializers,
    src: true
});

const logging = (message, err = false) => {
    
    if (!err) {
        log.info(message);
        //fs.writeFileSync('logSuccess.json',successlog);
    }

    if (err) {log.warn(message);
        //fs.writeFileSync('logFailure.json',JSON.stringify(log.info(message)));
    }

}


module.exports = { logging }