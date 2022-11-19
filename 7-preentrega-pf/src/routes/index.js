const express = require('express');
const productsRoutes = require('./products/products.routes');

const router = express.Router();

router.get('/health', async(_req, res) => {
    res.status(200).json({
        success: true,
        server: 'Up!',
    })
})
router.use('/products', productsRoutes);

module.exports = router;