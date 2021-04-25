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
    else if (personal.email.split('@').length !== 2) {
        errors.push('E-mail inválido!')
    }

    if (!personal.name) {
        errors.push(`O campo 'Nome completo' é obrigatório!`);
    }

    if (!personal.cpf) {
        errors.push(`O campo 'CPF' é obrigatório!`);
    }
    else if (!personal.cpf.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)) {
        errors.push(`CPF inválido!`);
    }

    if (!personal.birthdate) {
        errors.push(`O campo 'Data de nascimento' é obrigatório!`);
    }
    else {
        let today = new Date(),
            minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDay()),
            birthDate = new Date(personal.birthdate);

        if (minDate < birthDate) {
            errors.push('Para fazer o pedido é necessário que o comprador tenha 18 anos de idade ou mais.');
        }
    }

    if (!personal.cell && !personal.telephone) {
        errors.push(`Você deve informar o telefone ou o celular!`);
    }
    else {
        if (personal.cell && !personal.cell.match(/(\(\d{2}\)\s)(\d{4,5}\-\d{4})/g)) {
            errors.push('Celular inválido!');
        }

        if (personal.telephone && !personal.telephone.match(/(\(\d{2}\)\s)(\d{4,5}\-\d{4})/g)) {
            errors.push('Telefone inválido!');
        }
    }

    if (!address.cep) {
        errors.push(`O campo 'CEP' é obrigatório`);
    }
    else if (!address.cep.match(/^\d{5}\-\d{3}$/)) {
        errors.push('CEP inválido!');
    }

    if (!address.address) {
        errors.push(`O campo 'Endereço' é obrigatório`);
    }

    if (!address.number) {
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
