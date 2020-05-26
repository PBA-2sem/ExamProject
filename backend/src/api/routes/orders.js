const router = require('express').Router();
const auth = require('../auth');

const { insertSingleDocument, getAllMongoOrders } = require('../controllers/orderController')

const url = 'mongodb://ec2-100-25-168-91.compute-1.amazonaws.com:27017/'

// Add to shoppingcart

// remove from cart

// get shoppingcart


// create order
router.post('/', async function (req, res, next) {
    var result = await insertSingleDocument();
    return res.status(200).json(result);
});


// get order
router.get('/all', async function (req, res, next) {
    var result = await getAllMongoOrders();
    return res.status(200).json(result);
});






module.exports = router;