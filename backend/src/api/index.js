const router = require('express').Router();


router.get('/ping', (req, resp) => {
    resp.json({ hello: 'world!' })
})

router.use('/users', require('./routes/users'));
router.use('/products', require('./routes/products'));

module.exports = router;