class ViewOrder {
    static getResumeOrder(cart) {
        let content = '';

        cart.forEach(o => {
            content +=
                `<div class="product-into-cart">
                    
                    <div class="info-product-cart">

                        <div class="product-content">
                            <img src="${o.img}">
                            <div class="order-description">
                            <p>${o.description}</p>
                            <span>Quantidade: ${o.quantity}</span>
                            </div>
                        </div>
                        
                        <p class="card-product-value">R$ ${o.value}</p>
                    </div>

                </div>`;
        });

        content += '<button id="go-cart" class="cursor-pointer go-cart btn">Ir para o carrinho</button>';

        return content;
    }

    static getOrder(items) {
        let total = 0.0,
            content = `
        <div class="content-table filter-drop-shadow">
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
                <tbody id="tbody-products">`;

        items.forEach(o => {
            let valueXQuantity = (o.value * o.quantity).toFixed(2);
            content += `
                <tr id="tr-${o.id}">
                    <td>
                        <div class="flex-row table-product filter-drop-shadow">
                            <img class="img-order" src="${o.img}" alt="${o.description}">

                            <div>
                                <p>${o.description}</p>
                                <p>Cód: <span>${o.productCode}</span></p>
                                <p>Estoque: <span>Disponível</span></p>
                            </div>
                        </div>
                    </td>
                    <td class="font-bold">R$ ${o.value}</td>
                    <td class="font-bold">
                        <div class="flex-row justify-content-center">
                            <button id="btn-decrement-${o.id}" class="cursor-pointer bkg-light-blue btn-decrement">-</button>
                            <p id="quantity-${o.id}" class="bkg-light-blue">${o.quantity}</p>
                            <button id="btn-increment-${o.id}" class="cursor-pointer bkg-light-blue btn-increment">+</button>
                        </div>
                    </td>
                    <td id="value-${o.id}" class="font-bold">R$ ${valueXQuantity}</td>
                    <td><img id="delete-${o.id}" class="icon-20 cursor-pointer delete" src="../assets/Icons/trash.svg"></td>
                </tr>
            `;

            total += parseFloat(valueXQuantity);
        });

        content += `</tbody>
                </table>

                <div class="total">
                    Total: <span id="spn-total">R$ ${total}</span>
                </div>

                <div class="flex-row">
                    <div></div>
                    <div></div>
                    <div>
                        <button type="submit" id="continue-buying" class="cursor-pointer btn">Continuar comprando</button>
                        <button type="submit" id="finish" class="cursor-pointer btn">Finalizar a compra</button>
                    </div>
                </div>
            </div>
            
            <div class="forms">
            </div>`;

        return content;
    }
}