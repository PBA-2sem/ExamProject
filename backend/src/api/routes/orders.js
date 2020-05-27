const router = require('express').Router();
const auth = require('../auth');

const { insertSingleDocument, getAllMongoOrders } = require('../controllers/orderController')

const url = 'mongodb://ec2-100-25-168-91.compute-1.amazonaws.com:27017/'

// Add to shoppingcart

// remove from cart

// get shoppingcart


// create order
router.post('/insert/:id', async function (req, res, next) {
    const {id} = req.param()
    try {
        const result = await insertSingleDocument();
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