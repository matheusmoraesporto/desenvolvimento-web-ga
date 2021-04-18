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

    static getOrder(items) {
        let content = `
        <div class="content-table">
            <table>
                <thead class="head-order">
                    <tr>
                        <th>Produto</th>
                        <th>Preço unitário</th>
                        <th>Quantidade</th>
                        <th>Subtotal</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>`;

        items.forEach(o => {
            content+= `
                <tr>
                    <td>
                        <div class="flex-row table-product">
                            <img class="img-order" src="${o.img}" alt="${o.description}">

                            <div>
                                <p>${o.description}</p>
                                <p>Cód: <span>${o.productCode}</span></p>
                                <p>Estoque: <span>Disponível</span></p>
                            </div>
                        </div>
                    </td>
                    <td class="font-bold">R$ ${o.value}</td>
                    <td class="font-bold">${o.quantidade}</td>
                    <td id="value-${o.id}" class="font-bold">R$ ${o.value * o.quantidade}</td>
                    <td><img class="icon-20" src="../assets/Icons/cash.png"></td>
                </tr>
            `;
        });

        content += `</tbody>
                </table>

                <div>
                    <button type="submit" id="continue-buying" class="cursor-pointer">Continuar comprando</button>
                    <button type="submit" id="finish" class="cursor-pointer">Finalizar a compra</button>
                </div>
            </div>`;

        return content;
    }
}