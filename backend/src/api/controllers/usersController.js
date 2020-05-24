const { addUser, getUserByUsername } = require('../../dbFacades/mysqlFacade');
const { getUserSession, setUserSessionFromLogin } = require('../../dbFacades/redisFacade');
const bcrypt = require('bcryptjs');

async function createUser(username, password, age, country) {
    let hashedPwd = bcrypt.hashSync(password);

    const user = await addUser({ username, password: hashedPwd, age, country });
    return user;
}

// TODO : handle login with storing a session in redis (if present add session data to returned object)
async function login(username, password) {
    let user = await getUserByUsername(username);
    if (bcrypt.compareSync(password, user.password)) {
        delete user.password;
        delete user.create_time;
        // Get session from redis
        const inRedis = await getUserSession(user.id);
        if (inRedis) {
            user = { ...user, data: inRedis }
            return { user: user };
        } else {
            // Set new session for user without payload
            await setUserSessionFromLogin(user)
            console.log(user.id)
            return { user: user };
        }
    } else {
        throw Error('Wrong username or password')
    }
}

module.exports = {
    createUser,
    login,
}