const router = require('express').Router();
const auth = require('../auth');

const { updateShoppingCart } = require('../controllers/orderController');

// Add to shoppingcart

// Update shoppingcart
router.put('/shoppingcart', async (req, res, next) => {
    if (!req.body.data || !req.body.user) {
        return res.status(422).json({ error: 'data query parameter is missing' });
    }
    try {
        const result = await updateShoppingCart(req.body);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: err.message });
    }
});

// remove from cart

// get shoppingcart

// create order

// get order

module.exports = router;