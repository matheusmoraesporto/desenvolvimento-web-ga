const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    products = require('./data/products.json');;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', (req, res) => {
    let response = products.sort((a, b) => b.value - a.value);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
});

app.listen(3000, () => { });
