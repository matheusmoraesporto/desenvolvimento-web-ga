const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {});
