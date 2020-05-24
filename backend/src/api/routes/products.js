const router = require('express').Router();
const { getAllProducts, getProductByCategory, getProductById } = require('../controllers/productsController');

// get products
router.get('/', async (req, res, next) => {
    try {
        const result = await getAllProducts();
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});


// get by category
router.get('/category/:category', async (req, res, next) => {
    const { category } = req.params;
    if (typeof category !== "string") return res.status(500).json({ error: 'Id does not exist' });

    try {
        const result = await getProductByCategory(category);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});

// get products
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    if (typeof id !== "number") return res.status(500).json({ error: 'Id does not exist' });
    try {
        const result = await getProductById(id);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;