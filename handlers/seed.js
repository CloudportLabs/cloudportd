const axios = require('axios');
const Docker = require('dockerode');
const config = require('../config.json');
const CatLoggr = require('cat-loggr');
const { createVolumesFolder } = require('./init.js')
const log = new CatLoggr();

// Initialize Docker connection
const docker = new Docker({ socketPath: process.env.dockerSocket });

async function seed() {
    try {
        createVolumesFolder();

        //
    } catch (error) {
        log.error('Cannot get the image list from the panel!! The panel might be down. Error:', error.message);
        process.exit();
    }

    log.info('Great news panel database seems to be working just fine!!');
}

module.exports = { seed };
