const Redis = require("ioredis");

const redis = new Redis.Cluster([
    {
        port: process.env.REDIS_PORT,
        host: '34.207.62.135',
    },
    {
        port: process.env.REDIS_PORT,
        host: '3.85.54.175'
    },
    {
        port: process.env.REDIS_PORT,
        host: '52.91.150.136'
    }
], {
    slotsRefreshInterval: 100,
    slotsRefreshTimeout: 2000,
    redisOptions: {
        password: process.env.REDIS_PASSWORD
    }
});

function connect() {
    redis.on("error", function () {
        console.log("redis connection error ");
    });

    redis.on("reconnecting", function () {
        console.log("redis reconnect");
    });
    redis.on("close", function () {
        console.log("redis closed conn");
    });

    return redis.on("connect", () => {
        console.log("redis connection established..");
    });
}

async function getUserSession(id) {
    try {
        const value = await redis.get(id);
        return value !== null ? JSON.parse(value) : null;
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('An DB error happened')
    }
}

async function setUserSessionFromLogin(user) {
    try {
        const value = await redis.set(user.id, JSON.stringify({ user: user }), 'ex', 1800);
        return value;
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('An DB error happened')
    }
}

async function setUserSessionWithPayload(id, payload) {
    try {
        const value = await redis.set(id, JSON.stringify(payload), 'ex', 1800);
        return value;
    } catch (err) {
        console.log('ERROR: ', err)
        throw Error('An DB error happened')
    }
}

module.exports = {
    getUserSession,
    setUserSessionFromLogin,
    setUserSessionWithPayload,
    connect
}