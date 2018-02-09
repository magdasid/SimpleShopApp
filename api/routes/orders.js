const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Order.find()
    .select('_id product quantity')
    .exec()
    .then(results => {
        res.status(200).json({
            count: results.length,
            orders: results.map(result => {
                return {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});
router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new Order({
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'Order created',
                order: result
            });
        })
        .catch(err => {
            res.status(500).json({
            error: err
            })
        });
    });

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(result => {
        if(!result) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        res.status(200).json({
            order: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/:orderId', (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;