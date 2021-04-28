class ViewProducts {
    static getProducts(products) {
        let content = '';

        // Cria o componente dos cards dos produtos
        products.forEach((product) => {
            content += `
            <div class="card-products filter-drop-shadow">
                <img src="${product.img}" alt="${product.description}" class="products-images">
    
                <div class="description">
                    <p id="product-${product.id}" class="products-description">${product.description}</p>
                </div>
    
                <p id="value-${product.value}" class="products-value">R$ ${product.value}<p/>
                
                <div class="cart-button">
                    <button id="btn-add-product-${product.id}" class="cursor-pointer add-product btn">Adicionar ao carrinho</button>
                </div>
                
            </div>`;
        });

        content += `
            <button id="gotop" class="cursor-pointer" title="Voltar para o topo da página">
                <img src="../assets/Icons/rounded-up.svg" class="icon-20">
            </button>`;

        return content;
    }

    static getFilters() {
        return `
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

            <div class="flex-row">
                <input type="checkbox" name="jogos" id="Jogo" class="filters-type-product">
                <label for="jogos">Jogos</label>
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
    }

    static getSlider() {
        return `      <!-- Full-width images with number and caption text -->
        <div class="slides fade">
            <div class="numbertext">1 / 3</div>
            <img src="./assets/slideImages/slide2.jpg" style="width:100%">
        </div>

        <div class="slides fade">
            <div class="numbertext">2 / 3</div>
            <img src="./assets/slideImages/slide1.jpg" style="width:100%">
        </div>

        <div class="slides fade">
            <div class="numbertext">3 / 3</div>
            <img src="./assets/slideImages/slide3.jpg" style="width:100%">
        </div>

        <!-- Next and previous buttons -->
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>

        <!-- The dots/circles -->
        <div style="text-align:center">
            <span class="dot" onclick="currentSlide(1)"></span>
            <span class="dot" onclick="currentSlide(2)"></span>
            <span class="dot" onclick="currentSlide(3)"></span>
        </div>`;
    }
}