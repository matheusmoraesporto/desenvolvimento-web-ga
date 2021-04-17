let productsComponent = document.getElementsByClassName('products')[0],
    products = [],
    cart = [],
    content = '';

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();

    rawFile.overrideMimeType("application/json");

    rawFile.open("GET", file, true);

    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }

    rawFile.send(null);
}

// let getProducts = new Request('http://localhost:3000/products');

// fetch(getProducts)
//     .then(response => {
//         return response.text();
//     })
//     .then(response => {
//         console.log(response);
//     });


// var req = new XMLHttpRequest();

// req.addEventListener('load', (e) => {
//     console.log(e);
// })
// req.open('GET', 'http://localhost:3000/products', true);
// req.send();

readTextFile("./models/products.json", (text) => {
    let datasResponse = JSON.parse(text); //.slice(0, 3); // para fazer a paginação depois us guri vão se enlouquecer

    datasResponse.forEach(o => products.push(new Product(o)));

    products.forEach((product) => {
        content += `
        <div class="card-products">
            <img src="${product.img}" alt="Carrinho" class="cursor-pointer products-images">

            <div class="description">
            <p id="product-${product.id}" class="products-description">${product.description}</p>
            </div>
            
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
});