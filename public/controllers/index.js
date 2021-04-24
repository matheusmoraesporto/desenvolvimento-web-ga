let inputSearch = document.getElementById('search'),
    btnFind = document.getElementsByClassName('find')[0],
    asideProductsCart = document.getElementById('products-in-cart'),
    asideProductsCartDetails = document.getElementById('products-in-cart-detail'),
    btnCart = document.getElementById('btn-cart'),
    pEmptyCart = document.getElementById('empty-cart'),
    filtersTypeProduct = Array.prototype.slice.call(document.getElementsByClassName('filters-type-product')),
    divMain = document.getElementsByClassName('main')[0],
    logo = document.getElementsByClassName('logo')[0],
    event = new Event('changecart'),
    products = [],
    cart = [],
    filtersType = [],
    filtersBranch = [],
    formData = {
        personal: {},
        address: {}
    };

// Definição das funções
loadProducts = () => {
    fetch(new Request('http://localhost:3000/products'))
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(response => {
            products = response;
            renderProducts(response);
        })
        .catch(error => {
            alert(error);
        });
}

function goMainView() {
    Utils.pushComponent(divMain, ViewProducts.getFilters());

    asideProductsCart.hidden = true;

    // necessário, pois quando recriava a tela não estava adicionando o evento de click dos filtros
    let newfiltersTypeProduct = Array.prototype.slice.call(document.getElementsByClassName('filters-type-product'));

    newfiltersTypeProduct.forEach(o => {
        o.addEventListener('click', onCheckFilter);
    });

    loadProducts();
}

function maskPhone(value) {
    let r = value.replace(/\D/g, "");

    r = r.replace(/^0/, "");


    if (r.length > 11) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    }
    else if (r.length > 7) {
        r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    }
    else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    }
    else if (value.trim() !== "") {
        r = r.replace(/^(\d*)/, "($1");
    }

    return r;
}

function setData(data, property, newValue) {
    formData[data][property] = newValue;
}

function onChangeQuantity(event, isIncrement) {
    let typeBtn = isIncrement ? 'btn-increment-' : 'btn-decrement-',
        id = event.srcElement.id.replace(typeBtn, ''),
        quantity = document.getElementById(`quantity-${id}`),
        tdValue = document.getElementById(`value-${id}`),
        newQuantity = parseInt(quantity.textContent);

    if (isIncrement) {
        quantity.textContent = ++newQuantity;
    }
    else {
        quantity.textContent = --newQuantity;

        if (newQuantity <= 0) {
            onDeleteItem(event, typeBtn);
        }
    }

    cart.forEach(o => {
        if (o.id == id) {
            let valueR$ = (o.quantity * o.value).toFixed(2);

            o.quantity = newQuantity;

            tdValue.textContent = `R$ ${parseFloat(valueR$)}`;
        }
    });

    if (cart.length > 0) {
        Utils.updateTotalValue(cart);
    }
}

function onDeleteItem(event, complementId) {
    let id = event.srcElement.id.replace(complementId, ''),
        tbody = document.getElementById('tbody-products'),
        tr = document.getElementById(`tr-${id}`);

    cart = cart.filter(o => o.id != id);

    tbody.removeChild(tr);

    asideProductsCartDetails.innerHTML = ViewOrder.getResumeOrder(cart);

    addItensCart();

    Utils.updateTotalValue(cart);

    if (cart.length <= 0) {
        let contentTable = document.getElementsByClassName('content-table')[0];

        Utils.pushComponent(contentTable, ViewOrder.getComponentEmptyCart());

        defineContinueBuying();
    }
}

addItensCart = () => {
    let spnCart = document.getElementById('cart-length');

    if (cart.length > 0) {
        // Faz o tratamento para exibir a quantidade de itens no carrinho
        let productsInCart = 0;

        cart.forEach(o => productsInCart += o.quantity);

        spnCart.hidden = false;

        spnCart.textContent = productsInCart;

        pEmptyCart.hidden = true;
    } else {
        spnCart.hidden = true;

        /// aqui remove os itens que estão no carrinho
        asideProductsCartDetails.innerHTML = '';
        pEmptyCart.hidden = false;
    }
}

renderProducts = (items) => {
    let productsComponent = document.getElementsByClassName('products')[0];

    Utils.pushComponent(productsComponent, ViewProducts.getProducts(items));

    let gotop = document.getElementById("gotop");

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 650 || document.documentElement.scrollTop > 650) {
            gotop.style.display = "block";
        } else {
            gotop.style.display = "none";
        }
    }

    gotop.addEventListener('click', () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });


    let allBtnAddProduct = Array.prototype.slice.call(document.getElementsByClassName('add-product'));

    // Adiciona para todos eles o evento que irá adicionar o produto no carrinho
    allBtnAddProduct.forEach((btn) => {
        // Registra eventos dos botões
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            let id = event.srcElement.id.replace('btn-add-product-', ''),
                newProduct = items.filter(o => o.id == id)[0];

            // Aqui adiciona o item no carrinho se ele ainda não estiver lá, se não tem que incrementar a quantidade
            if (cart.some(o => o.id === newProduct.id)) {
                cart.forEach(o => {
                    if (o.id === newProduct.id) {
                        o.quantity++;
                    }
                });
            } else {
                cart.push(new ProductCart(newProduct, 1));
            }

            addItensCart();

            if (cart.length > 0) {
                // aqui adiciona os itens que estão no carrinho
                asideProductsCartDetails.innerHTML = ViewOrder.getResumeOrder(cart);

                let btnGoCart = document.getElementById('go-cart');

                // Cria a view com os detalhes da compra
                btnGoCart.addEventListener('click', () => {
                    Utils.pushComponent(divMain, ViewOrder.getOrder(cart));

                    asideProductsCart.hidden = true;

                    let btnFinish = document.getElementById('finish'),
                        allBtnDelete = Array.prototype.slice.call(document.getElementsByClassName('delete')),
                        allBtnIncrement = Array.prototype.slice.call(document.getElementsByClassName('btn-increment')),
                        allBtnDecrement = Array.prototype.slice.call(document.getElementsByClassName('btn-decrement')),
                        inputCpf = document.getElementById('cpf'),
                        inputCep = document.getElementById('cep'),
                        inputCell = document.getElementById('cell'),
                        inputTelephone = document.getElementById('telephone'),
                        fields = Array.prototype.slice.call(document.getElementsByClassName('input-form'));

                    fields.forEach(o => {
                        o.addEventListener('change', () => {
                            let personalFields = [
                                'email',
                                'name',
                                'cpf',
                                'birthdate',
                                'cell',
                                'telephone',
                            ];

                            setData(personalFields.includes(o.name) ? 'personal' : 'address', o.name, o.value);
                        });
                    });

                    inputCpf.addEventListener('keyup', () => {
                        if (inputCpf.value) {
                            // Obtém somente os números, para obter a quantidade máxima que pode ser informada
                            inputCpf.value =
                                inputCpf.value
                                    .replace(/[^\d]+/g, '')
                                    .slice(0, 11);

                            if (inputCpf.value) {
                                // então aplica a máscara de cpf
                                inputCpf.value =
                                    inputCpf.value
                                        .match(/.{1,3}/g)
                                        .join(".")
                                        .replace(/\.(?=[^.]*$)/, "-");
                            }
                        }
                    });

                    inputCep.addEventListener('keyup', () => {
                        if (inputCep.value) {
                            // Obtém somente os números, para obter a quantidade máxima que pode ser informada
                            inputCep.value =
                                inputCep.value
                                    .replace(/[^\d]+/g, '')
                                    .slice(0, 8);

                            if (inputCep.value) {
                                // então aplica a máscara de cpf
                                inputCep.value = inputCep.value.match(/.{1,5}/g).join("-");
                            }
                        }
                    });

                    inputCell.addEventListener('keyup', () => {
                        if (inputCell.value) {
                            inputCell.value = maskPhone(inputCell.value);
                        }
                    });

                    inputTelephone.addEventListener('keyup', () => {
                        if (inputTelephone.value) {
                            inputTelephone.value = maskPhone(inputTelephone.value);
                        }
                    });

                    defineContinueBuying();

                    allBtnDelete.forEach(o => {
                        o.addEventListener('click', (event) => onDeleteItem(event, 'delete-'));
                    });

                    allBtnIncrement.forEach(o => {
                        o.addEventListener('click', (event) => onChangeQuantity(event, true));
                    })

                    allBtnDecrement.forEach(o => {
                        o.addEventListener('click', (event) => onChangeQuantity(event, false));
                    })

                    btnFinish.addEventListener('click', () => {
                        let req = new Request('http://localhost:3000/finish', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(formData)
                        });
                        fetch(req)
                            .then(response => {
                                return response.json();
                            })
                            .then(response => {
                                if (response.possuiErros) {
                                    alert(response.msg);
                                    return;
                                }

                                let contentFinish = ViewOrderFinish.getOrderFinish(cart);

                                cart = [];

                                addItensCart();

                                Utils.pushComponent(divMain, contentFinish);

                                let btnBack = document.getElementById('back');

                                btnBack.addEventListener('click', goMainView);
                            })
                            .catch(responseError => {
                                alert(responseError);
                            });
                    });
                });
            }
        });
    });
};

function onCheckFilter(event) {
    let { id, checked } = event.srcElement,
        productsFiltered = [],
        property = ['Console', 'Acessorio'].includes(id) ? 'type' : 'branch';

    if (property === 'type') {
        filtersType = defineFilter(filtersType, checked, id);
    } else {
        filtersBranch = defineFilter(filtersBranch, checked, id);
    }

    productsFiltered = products.filter(o =>
        (filtersType.length === 0 || filtersType.includes(o.type)) &&
        (filtersBranch.length === 0 || filtersBranch.includes(o.branch)));

    renderProducts(productsFiltered);
};

defineFilter = (items, checked, id) => {
    if (checked) {
        items.push(id);
    } else {
        items = items.filter(o => o !== id);
    }

    return items;
}

defineContinueBuying = () => {
    let btnContinueBuying = document.getElementById('continue-buying');
    btnContinueBuying.addEventListener('click', goMainView);
}

loadProducts();

// Adiciona os eventos
logo.addEventListener('click', goMainView);

btnCart.addEventListener('click', () => {
    asideProductsCart.hidden = !asideProductsCart.hidden;
});

filtersTypeProduct.forEach(o => {
    o.addEventListener('click', onCheckFilter);
});

btnFind.addEventListener('click', (event) => {
    event.preventDefault();

    if (inputSearch.value.length > 0) {
        let productsSerach = products.filter(o => o.description.toLowerCase().includes(inputSearch.value.toLowerCase()));
        renderProducts(productsSerach);
    } else {
        renderProducts(products);
    }
});

inputSearch.addEventListener('change', () => {
    if (!inputSearch.value) {
        renderProducts(products);
    } else {
        let productsSerach = products.filter(o => o.description.toLowerCase().includes(inputSearch.value.toLowerCase()));
        renderProducts(productsSerach);
    }
});