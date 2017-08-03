var express = require('express');
var router = express.Router();
var Product = require('../models/Product');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs){
    var productGroup = [];
    var groupSize = 3;
    for(var i=0; i < docs.length; i += groupSize) {
      productGroup.push(docs.slice(i, i+groupSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productGroup});
  });
});

module.exports = router;
