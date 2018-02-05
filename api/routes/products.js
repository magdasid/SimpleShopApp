const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Products were fetched'
    });
});
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'workin'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id==='special') {
        res.status(200).json({
            message: 'You discovered lol',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'lulz nie ma',

        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Product updated'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Product deleted'
    });
});


module.exports = router;