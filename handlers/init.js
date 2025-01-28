const axios = require('axios');
const Docker = require('dockerode');
const config = require('../config.json')
const CatLoggr = require('cat-loggr');
const log = new CatLoggr();
const fs = require('fs').promises;
const path = require('path');

async function init() {
    // No longer used
    log.error('Do note this is a very rigged version of Cloudport Daemon!! Bugs may occur we will try our best to solve them!!');
   
}

async function createVolumesFolder() {
  try {
    await fs.mkdir(path.join(__dirname, '../volumes'), { recursive: true });
    log.info('Volumes folder created successfully, phew it worked :skull:');
  } catch (error) {
    console.error('Error creating volumes folder:', error);
  }
}

module.exports = { init, createVolumesFolder }
