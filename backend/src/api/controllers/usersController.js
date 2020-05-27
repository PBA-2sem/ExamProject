const { addUser, getUserByUsername } = require('../../dbFacades/mysqlFacade');
const { getUserSession, setUserSessionFromLogin } = require('../../dbFacades/redisFacade');
const bcrypt = require('bcryptjs');

async function createUser(username, password, age, country) {
    let hashedPwd = bcrypt.hashSync(password);

    const user = await addUser({ username, password: hashedPwd, age, country });
    return user;
}

async function login(username, password) {
    let user = await getUserByUsername(username);
    if (bcrypt.compareSync(password, user.password)) {
        delete user.password;
        delete user.create_time;
        // Get session from redis
        const inRedis = await getUserSession(user.id);
        if (inRedis) {
            return { user: user, ...inRedis };
        } else {
            // Set new session for user without payload
            await setUserSessionFromLogin(user)
            return { user: user };
        }
    } else {
        throw Error('Wrong username or password')
    }
}

async function loginWithSession(userID) {
    console.log(userID)
    const inRedis = await getUserSession(userID);
    console.log(inRedis)
    if (inRedis) {
        return { ...inRedis };
    } else
        throw Error('UserIDs session has expired in Redis');
}

module.exports = {
    createUser,
    login,
    loginWithSession
}