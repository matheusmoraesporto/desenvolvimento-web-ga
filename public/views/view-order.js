class ViewOrder {
    static getResumeOrder(cart) {
        let content = '';

        cart.forEach(o => {
            console.log(o.quantidade);
            content +=
                `<div class="product-into-cart">
                    
                    <div class="info-product-cart">

                        <div class="product-content">
                            <img src="${o.img}">
                            <div class="order-description">
                            <p>${o.description}</p>
                            <span>Quantidade: ${o.quantidade}</span>
                            </div>
                        </div>
                        
                        <p class="card-product-value">R$ ${o.value}</p>
                    </div>

                </div>`;
        });

        content += '<button id="go-cart" class="cursor-pointer go-cart">Ir para o carrinho</button>';

        return content;
    }

    static getOrder() {
        return `
            <div>
                <button type="submit" id="continue-buying" class="cursor-pointer">Continuar comprando</button>
                <button type="submit" id="finish" class="cursor-pointer">Finalizar a compra</button>
            </div>`;
    }
}