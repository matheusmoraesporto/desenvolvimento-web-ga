const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    products = require('./data/products.json');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', (req, res) => {
    let response = products.sort((a, b) => b.value - a.value);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
});

app.post('/finish', (req, res) => {
    let { address, personal } = req.body,
        errors = [],
        response = { msg: '', possuiErros: false };

    if (!personal.email) {
        errors.push(`O campo 'E-mail' é obrigatório!`);
    }

    if (!personal.name) {
        errors.push(`O campo 'Nome completo' é obrigatório!`);
    }

    if (!personal.cpf) {
        errors.push(`O campo 'CPF' é obrigatório!`);
    }

    if (!personal.birthdate) {
        errors.push(`O campo 'Data de nascimento' é obrigatório!`);
    }

    if (!personal.cell && !personal.telephone) {
        errors.push(`Você deve informar o telefone ou o celular!`);
    }

    if (!address.cep) {
        errors.push(`O campo 'CEP' é obrigatório`);
    }

    if (!address.address) {
        errors.push(`O campo 'Endereço' é obrigatório`);
    }

    if (!address.num) {
        errors.push(`O campo 'Número' é obrigatório`);
    }

    if (!address.state) {
        errors.push(`O campo 'Estado' é obrigatório`);
    }

    if (!address.city) {
        errors.push(`O campo 'Cidade' é obrigatório`);
    }

    if (errors.length > 0) {
        response.msg = errors[0];
        response.possuiErros = true;
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
        return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
});

app.listen(3000, () => { });
