let productsComponent = document.getElementsByClassName('products')[0],
    inputSearch = document.getElementById('search'),
    btnFind = document.getElementsByClassName('find')[0],
    filtersTypeProduct = Array.prototype.slice.call(document.getElementsByClassName('filters-type-product')),
    products = [],
    cart = [],
    filtersType = [],
    filtersBranch = [],
    loadProducts = new Request('http://localhost:3000/products');

fetch(loadProducts)
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

renderProducts = (items) => {
    let content = '';

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
            
            </div>
        `;
    });

    Utils.pushComponent(productsComponent, content);

    let allBtnAddProduct = Array.prototype.slice.call(document.getElementsByClassName('add-product'));

    allBtnAddProduct.forEach((btn) => {
        // Registra eventos dos botões
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            let id = event.srcElement.id.replace('btn-add-product-', ''),
                spnCart = document.getElementById('cart-length'),
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

            if (cart.length > 0) {
                let productsInCart = 0;

                cart.forEach(o => productsInCart += o.quantidade);

                spnCart.hidden = false;

                spnCart.textContent = productsInCart;
            } else {
                spnCart.hidden = true;
            }
        });
    });
};

filtersTypeProduct.forEach(o => {
    o.addEventListener('click', onClick);
});

function onClick(event) {
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
});