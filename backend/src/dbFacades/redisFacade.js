const Redis = require("ioredis");
const redis = new Redis.Cluster([
    {
        port: 6001,
        host: "34.207.62.135",
    }
], {
    scaleReads: "slave",
    slotsRefreshInterval: 100,
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

    return redis.on("connect", () => {
        // redis.del('c9444ac7-9d19-11ea-9249-f201836c1c4e');
        console.log("redis connected established..");
    });
}
connect();

async function getUserSession(id) {
    try {
        console.time('Redis get by id');
        const value = await redis.get(id);
        console.timeEnd('Redis get by id');
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
    setUserSessionWithPayload
}