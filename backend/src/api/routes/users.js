const router = require('express').Router();
const auth = require('../auth');

const { createUser, login } = require('../controllers/usersController');

// TODO: get user if authorized (get session data from redis)
// get user data if already logged in
router.get('/user', auth.isAuthorized, function (req, res, next) {
    // if (!user) { return res.sendStatus(401); }
    return res.json({});
});


// TODO: create login logic (create a session in redis)
// Login
router.post('/login', async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return res.status(422).json({ error: 'Username or password missing' });
    }

    try {
        const result = await login(req.body.username, req.body.password);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: err.message });
    }

});

// create user
router.post('/', async (req, res, next) => {
    const { username, password, age, country } = req.body;
    if (!username || !password || !age || !country) return res.status(422).json({ error: 'Data missing, fill out all form fields' });

    try {
        const user = await createUser(username, password, age, country);
        return res.status(201).json({ user: user });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ error: err.message })
    }

})

module.exports = router;