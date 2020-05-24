const Redis = require("ioredis");

const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD
});

async function getUserSession(id) {
    try {
        const value = await redis.get(id);
        return value;
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('An DB error happened')
    }
}

async function setUserSessionFromLogin(id) {
    try {
        const value = await redis.set(id, "", 'ex', 1800);
        return value;
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('An DB error happened')
    }
}

async function setUserSessionWithPayload(id, payload) {
    try {
        const value = await redis.set(id, payload, 'ex', 1800);
        return value;
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('An DB error happened')
    }
}

module.exports = {
    getUserSession,
    setUserSessionFromLogin,
    setUserSessionWithPayload
}