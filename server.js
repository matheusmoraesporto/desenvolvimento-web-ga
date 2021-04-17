const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    url = require('url');

const route = express.Router();

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/products', (req, res) => {
//     console.log('teste');

//     var t = { hello: 'world' };

//     res.writeHead(200, { 'Content-Type': 'text/html' })

//     res.json(t);
// });



// app.route('/products')
//   .get(function(req, res) {
//     res.send('Get a random book');
//   });



// app.get('/products', function(req, res) {
//     res.send('hello world');
// });



app.listen(3000, () => { });
