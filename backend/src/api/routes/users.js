const router = require('express').Router();
const auth = require('../auth');

const { createUser, login, loginWithSession } = require('../controllers/usersController');


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

router.post('/loginWithSession', async (req, res, next) => {
    if (!req.body.userID) {
        return res.status(422).json({ error: 'UserId is missing!' });
    }

    try {
        const result = await loginWithSession(req.body.userID);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(422).json({ error: err.message });
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