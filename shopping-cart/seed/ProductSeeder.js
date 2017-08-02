var Product = require('../models/Product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shopping', {
  useMongoClient: true
});

var products = [
    new Product({
        imagePath: 'http://blaber.pl/wp-content/uploads/2016/03/One-Bowl-Brownies-Final1-e1458118056626.jpg',
        title: 'Brownie',
        description: 'Brownie wegańskie z fasoli',
        price: 30
    }),
    new Product({
        imagePath: 'http://ostra-na-slodko.pl/wp-content/uploads/2013/11/ciasto-cytrynowe-z-budyniem-cytryny-budn-budyniowe-z-owocami-biszkopt-xxxxxxx.jpg',
        title: 'Ciasto cytrynowe',
        description: 'Mocno cytrynowe ciasto wysokobiałkowe',
        price: 40
    }),
    new Product({
        imagePath: 'https://fotokulinarnie.pl/wp-content/uploads/2014/05/IMG_9241-792x528.jpg',
        title: 'Ciasto marchewkowe',
        description: 'Ciasto marchewkowe z orzechami brazylijskimi',
        price: 30
    }),
];

var done = 0;
for(var i=0; i< products.length; i++) {
    products[i].save(function(err, res){
        done++;
        if(done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}