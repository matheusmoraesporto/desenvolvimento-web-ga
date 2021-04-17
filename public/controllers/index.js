let productsComponent = document.getElementsByClassName('products')[0],
    products = [],
    cart = [],
    content = '',
    loadProducts = new Request('http://localhost:3000/products');

fetch(loadProducts)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }
    })
    .then(response => {
        renderProducts(response);
    })
    .catch(error => {
        alert(error);
    });

renderProducts = (products) => {
    products.forEach((product) => {
        content += `
        <div>
            <img src="${product.img}" alt="Carrinho" class="cursor-pointer">
            <p id="product-${product.id}">${product.description}</p>
            <button id="btn-add-product-${product.id}" class="add-product">Adicionar ao carrinho</button>
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
                newProduct = products.filter(o => o.id == id)[0];

            // Aqui adiciona o item no carrinho se ele ainda não estiver lá, se não tem que incrementar a quantidade
            if (cart.some(o => o.id === newProduct.id)) {
                cart.forEach(o => {
                    if (o.id === newProduct.id) {
                        o.quantidade++;
                    }
                });
            }
            else {
                cart.push(new ProductCart(newProduct, 1));
            }

            if (cart.length > 0) {
                let productsInCart = 0;

                cart.forEach(o => productsInCart += o.quantidade);

                spnCart.hidden = false;

                spnCart.textContent = productsInCart;
            }
            else {
                spnCart.hidden = true;
            }
        });
    });
};
