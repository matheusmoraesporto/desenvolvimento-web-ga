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
    filtersBranch = [];

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
    let contentMain = '';

    contentMain += `
        <div class="filtros">
            <h4>Tipo de produto</h4>
            <div class="flex-row">
                <input type="checkbox" name="consoles" id="Console" class="filters-type-product">
                <label for="consoles">Consoles</label>
            </div>

            <div class="flex-row">
                <input type="checkbox" name="acessorios" id="Acessorio" class="filters-type-product">
                <label for="acessorios">Acessórios</label>
            </div>

            <h4>Marca</h4>
            <div class="flex-row">
                <input type="checkbox" name="nintendo" id="Nintendo" class="filters-type-product">
                <label for="playstation">Nintendo</label>
            </div>

            <div class="flex-row">
                <input type="checkbox" name="playstation" id="Playstation" class="filters-type-product">
                <label for="acessorios">Playstation</label>
            </div>

            <div class="flex-row">
                <input type="checkbox" name="sega" id="Sega" class="filters-type-product">
                <label for="sega">Sega</label>
            </div>

            <div class="flex-row">
                <input type="checkbox" name="xbox" id="Xbox" class="filters-type-product">
                <label for="xbox">Xbox</label>
            </div>
        </div>

        <div class="products flex-wrap">
        </div>`;

    Utils.pushComponent(divMain, contentMain);

    asideProductsCart.hidden = true;

    loadProducts();
}

addItensCart = () => {
    let spnCart = document.getElementById('cart-length');

    if (cart.length > 0) {
        // Faz o tratamento para exibir a quantidade de itens no carrinho
        let productsInCart = 0;

        cart.forEach(o => productsInCart += o.quantidade);

        spnCart.hidden = false;

        spnCart.textContent = productsInCart;

        pEmptyCart.hidden = true;
    }
    else {
        spnCart.hidden = true;

        /// aqui remove os itens que estão no carrinho
        asideProductsCartDetails.innerHTML = '';
        pEmptyCart.hidden = false;
    }
}

renderProducts = (items) => {
    let productsComponent = document.getElementsByClassName('products')[0],
        content = '';

    // Cria o componente dos cards dos produtos
    items.forEach((product) => {
        content += `
        <div class="card-products">
            <img src="${product.img}" alt="Carrinho" class="products-images">

            <div class="description">
                <p id="product-${product.id}" class="products-description">${product.description}</p>
            </div>

            <p id="value-${product.value}" class="products-value">R$ ${product.value}<p/>
            
            <div class="cart-button">
                <button id="btn-add-product-${product.id}" class="cursor-pointer add-product">Adicionar ao carrinho</button>
            </div>
            
        </div>`;
    });

    Utils.pushComponent(productsComponent, content);

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
                        o.quantidade++;
                    }
                });
            } else {
                cart.push(new ProductCart(newProduct, 1));
            }

            addItensCart();

            if (cart.length > 0) {
                let content = '';

                cart.forEach(o => {
                    content +=
                        `<p>${o.description}</p>`;
                });

                content += '<button id="go-cart" class="cursor-pointer go-cart">Ir para o carrinho</button>';

                // aqui adiciona os itens que estão no carrinho
                asideProductsCartDetails.innerHTML = content;

                let btnGoCart = document.getElementById('go-cart');

                // Cria a view com os detalhes da compra
                btnGoCart.addEventListener('click', () => {
                    let contentCart = '';

                    contentCart +=
                        `<div>
                            <button type="submit" id="continue-buying" class="cursor-pointer">Continuar comprando</button>
                            <button type="submit" id="finish" class="cursor-pointer">Finalizar a compra</button>
                        </div>`;

                    Utils.pushComponent(divMain, contentCart);

                    asideProductsCart.hidden = true;

                    let btnContinueBuying = document.getElementById('continue-buying'),
                        btnFinish = document.getElementById('finish');

                    btnContinueBuying.addEventListener('click', goMainView);

                    btnFinish.addEventListener('click', () => {
                        // Implementar as validações do formulário

                        let contentFinish = '';

                        contentFinish +=
                            `<div>
                                <div class="flex-row">
                                    <div>
                                        <h3>Resumo do pedido</h3>
                                        <p>Número do pedido: <span>${parseInt(Math.random() * 100000)}</span></p>
                                        <p>Valor do pedido: <span>R$ESTÁ FIXO NEGÃO</span></p>
                                    </div>
                                    <div>
                                        <h3>Pedido conlcluído com sucesso!</h3>
                                        <img src="../assets/Icons/ok.png" alt="Sucesso" class="">
                                    </div>
                                </div>
                                
                                <div class="flex-row">
                                    <p>O boleto de cobrança foi enviado para o seu e-mail.</p>
                                    <button type="submit" id="back" class="cursor-pointer">Voltar ao início <img src="../assets/Icons/log-out.svg" alt="Voltar" class=""></button>
                                </div>
                            </div>`;

                        cart = [];

                        addItensCart();

                        Utils.pushComponent(divMain, contentFinish);

                        let btnBack = document.getElementById('back');

                        btnBack.addEventListener('click', goMainView);
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
    }
    else {
        filtersBranch = defineFilter(filtersBranch, checked, id);
    }

    productsFiltered = products.filter(o =>
        (filtersType.length === 0 || filtersType.includes(o.type))
        && (filtersBranch.length === 0 || filtersBranch.includes(o.branch)));

    renderProducts(productsFiltered);
};

defineFilter = (items, checked, id) => {
    if (checked) {
        items.push(id);
    }
    else {
        items = items.filter(o => o !== id);
    }

    return items;
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
    }
    else {
        renderProducts(products);
    }
});

inputSearch.addEventListener('change', () => {
    if (!inputSearch.value) {
        renderProducts(products);
    }
    else {
        let productsSerach = products.filter(o => o.description.toLowerCase().includes(inputSearch.value.toLowerCase()));
        renderProducts(productsSerach);
    }
});