const router = require('express').Router();
const auth = require('../auth');

const { insertSingleDocument, getAllMongoOrders, updateShoppingCart } = require('../controllers/orderController')

const url = 'mongodb://ec2-100-25-168-91.compute-1.amazonaws.com:27017/'


// Add to shoppingcart

// Update shoppingcart
router.put('/shoppingcart', async (req, res, next) => {
    if (!req.body.data || !req.body.user) {
        return res.status(422).json({ error: 'Data query parameter is missing' });
    }
    try {
        console.time('Redis update shopping cart');
        const result = await updateShoppingCart(req.body);
        console.timeEnd('Redis update shopping cart');
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});

// create order
router.post('/', async function (req, res, next) {
    // console.log(JSON.stringify(req.body, null, 2))
    const { order } = req.body;
    if (!order) return res.status(422).json({ error: 'Order missing' });
    try {
        const result = await insertSingleDocument(order);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});


// get order
router.get('/all', async function (req, res, next) {
    try {
        const result = await getAllMongoOrders();;
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});





module.exports = router;