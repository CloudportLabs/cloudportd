const os = require('os');
const fs = require('fs');
const path = require('path');
const CatLoggr = require('cat-loggr');
const log = new CatLoggr();
const osut = require('os-utils');

const storagePath = path.join(__dirname, '../storage/systemStats.json');
const maxAge = 5 * 60 * 10000;
let statsLog = [];

function ensureStorageDirectory() {
    const storageDir = path.dirname(storagePath);
    if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir, { recursive: true });
    }
}

function calculateCpuUsage() {
    return new Promise((resolve) => {
        osut.cpuUsage((v) => {
            resolve({
                coresMax: os.cpus().length,
                coresUsage: (v * 100).toFixed(2)
            });
        });
    });
}

async function getCurrentStats() {
    const timestamp = new Date().toISOString();
    const totalMemory = os.totalmem() / (1024 * 1024);
    const freeMemory = os.freemem() / (1024 * 1024);
    const usedMemory = totalMemory - freeMemory;
    const cpuStats = await calculateCpuUsage();

    return {
        timestamp,
        RamMax: `${totalMemory.toFixed(2)} MB`,
        Ram: `${usedMemory.toFixed(2)} MB`,
        CoresMax: cpuStats.coresMax,
        Cores: `${cpuStats.coresUsage}%`
    };
}

function cleanOldEntries() {
    const now = Date.now();
    statsLog = statsLog.filter(entry => {
        const entryTime = new Date(entry.timestamp).getTime();
        return now - entryTime <= maxAge;
    });
}

function saveStats(stats) {
    if (stats && stats.timestamp) {
        statsLog.push(stats);
        cleanOldEntries();
        fs.writeFile(storagePath, JSON.stringify(statsLog, null, 2), (err) => {
            if (err) {
                log.error('Error saving stats to the file:', err);
            }
        });
    }
}

function initLogger() {
    ensureStorageDirectory();
    if (fs.existsSync(storagePath)) {
        try {
            const data = fs.readFileSync(storagePath, 'utf8');
            const parsedData = JSON.parse(data);
            if (Array.isArray(parsedData)) {
                statsLog = parsedData.filter(entry => entry && entry.timestamp);
                cleanOldEntries();
                fs.writeFile(storagePath, JSON.stringify(statsLog, null, 2), (err) => {
                    if (err) {
                        log.error('Error saving stats to the file:', err);
                    }
                });
            } else {
                log.error('Error parsing the JSON data:', parsedData);
                statsLog = [];
            }
        } catch (err) {
            log.error('Error reading stats from the file:', err);
            statsLog = [];
        }
    }
}

function getSystemStats(periodInMs) {
    if (periodInMs) {
        const now = Date.now();
        return statsLog.filter(entry => {
            const entryTime = new Date(entry.timestamp).getTime();
            return now - entryTime <= periodInMs;
        });
    } else {
        return getCurrentStats();
    }
}

getSystemStats.total = function() {
    return statsLog;
};

module.exports = {
    initLogger,
    getSystemStats,
    saveStats
};
