const router = require('express').Router();

const { registerProductAddedToShoppingCart, getTop3Colors } = require('../controllers/neo4jController');


router.post('/registerAgeAndColor', async (req, res, next) => {
    if (!req.body.age || !req.body.color) {
        return res.status(422).json({ error: 'data query parameter is missing' });
    }
    try {
        const result = await registerProductAddedToShoppingCart(req.body);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
});

router.post('/top3', async (req, res, next) => {
    if (!req.body.age) {
        return res.status(422).json({ error: 'data query parameter is missing' });
    }
    try {
        const result = await getTop3Colors(req.body.age);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
});

module.exports = router;