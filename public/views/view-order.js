class ViewOrder {
    static getResumeOrder(cart) {
        let content = '';

        cart.forEach(o => {
            content +=
                `<p>${o.description}</p>`;
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