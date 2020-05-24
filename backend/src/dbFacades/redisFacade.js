const Redis = require("ioredis");

const redis = new Redis.Cluster([
    {
        port: 6001,
        host: "34.207.62.135",
        password: 'teamwingitisawesome'
    },
    {
        port: 6001,
        host: "3.85.54.175",
        password: 'teamwingitisawesome'
    },
    {
        port: 6001,
        host: "52.91.150.136",
        password: 'teamwingitisawesome'
    },
]);

async function connect() {
    redis.on("error", function (err) {
        console.log("redis connection error " + err);
        process.exit(1);
    });
    return await redis.on("connect", () => { console.log("redis connected established.."); });
}

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
    connect,
    getUserSession,
    setUserSessionFromLogin,
    setUserSessionWithPayload
}