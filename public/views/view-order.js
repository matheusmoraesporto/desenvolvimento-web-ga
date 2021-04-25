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
                    Total: <span id="spn-total">R$ ${total.toFixed(2)}</span>
                </div>

                <div class="flex-row forms">
                    <div class="forms-detail form-personal">
                        <div class="flex-row forms-detail-head">
                            <img src="../assets/Icons/personal.png" class="icon-20">
                            <h4>Informações cadastrais</h4>
                        </div>

                        <div class="div-input-form">
                            <label for="email">E-mail:</label>
                            <input class="input-form" type="text" name="email" id="email" placeholder="Exemplo: jmgames@gmail.com.br">
                        </div>

                        <div class="div-input-form">
                            <label for="name">Nome completo:</label>
                            <input class="input-form" type="text" name="name" id="name">
                        </div>

                        <div class="flex-row div-input-form">
                            <div class="input-50">
                                <label for="cpf">CPF:</label>
                                <input class="input-form input-form-margin-right" type="text" name="cpf" id="cpf" placeholder="xxx.xxx.xxx-xx">
                            </div>

                            <div class="input-50">
                                <label for="birthdate">Data de nascimento:</label>
                                <input class="input-form" type="date" name="birthdate" id="birthdate">
                            </div>
                        </div>

                        <div class="flex-row div-input-form">
                            <div class="input-50">
                                <label for="cell">Celular:</label>
                                <input class="input-form input-form-margin-right" type="text" name="cell" id="cell" placeholder="(xx) xxxx-xxxx">
                            </div>

                            <div class="input-50">
                                <label for="telephone">Telefone:</label>
                                <input class="input-form" type="text" name="telephone" id="telephone" placeholder="(xx) xxxx-xxxx">
                            </div>
                        </div>
                    </div>

                    <div class="forms-detail form-address">
                        <div class="flex-row forms-detail-head">
                            <img src="../assets/Icons/location.png" class="icon-20">
                            <h4>Entrega</h4>
                        </div>

                        <div class="flex-row">
                            <div class="input-50 div-input-form">
                                <label for="cep">CEP:</label>
                                <input class="input-form input-form-margin-right" type="text" name="cep" id="cep" placeholder="xxxxx-xxx">
                            </div>

                            <div class="input-50 div-input-form">
                                <label for="complement">Complemento:</label>
                                <input class="input-form" type="text" name="complement" id="complement">
                            </div>
                        </div>

                        <div class="div-input-form">
                            <label for="address">Endereço:</label>
                            <input class="input-form" type="text" name="address" id="address">
                        </div>

                        <div class="flex-row div-input-form">
                            <div class="input-50">
                                <label for="number">Número:</label>
                                <input class="input-form input-form-margin-right" type="number" name="number" id="number" min="1">
                            </div>

                            <div class="input-50">
                                <label for="reference">Referência:</label>
                                <input class="input-form" type="text" name="reference" id="reference">
                            </div>
                        </div>

                        <div class="flex-row div-input-form">
                            <div class="select-component">
                                <legend>Estado:</legend>
                                <select class="input-form input-form-margin-right" name="state">
                                    <option>--</option>
                                    <option>AC</option>
                                    <option>AL</option>
                                    <option>AM</option>
                                    <option>AP</option>
                                    <option>BA</option>
                                    <option>CE</option>
                                    <option>DF</option>
                                    <option>ES</option>
                                    <option>GO</option>
                                    <option>MA</option>
                                    <option>MG</option>
                                    <option>MS</option>
                                    <option>MT</option>
                                    <option>PA</option>
                                    <option>PB</option>
                                    <option>PE</option>
                                    <option>PI</option>
                                    <option>PR</option>
                                    <option>RJ</option>
                                    <option>RN</option>
                                    <option>RO</option>
                                    <option>RR</option>
                                    <option>RS</option>
                                    <option>SC</option>
                                    <option>SE</option>
                                    <option>SP</option>
                                    <option>TO</option>
                                </select>
                            </div>

                            <div class="input-70">
                                <label for="city">Cidade:</label>
                                <input class="input-form" type="text" name="city" id="city">
                            </div>
                        </div>
                    </div>
                    <div class="forms-detail form-payment">
                        <div class="flex-row forms-detail-head">
                            <img src="../assets/Icons/cash.png" class="icon-20">
                            <h4>Pagamento</h4>
                        </div>
                        
                        <div class="form-payment-bank-slip">
                            <div class="flex-row payment-bank-slip">
                                <img src="../assets/Icons/boleto.png" class="icon-20">
                                <p>via boleto bancário</p>
                            </div>

                            <div class="payment-bank-slip-detail flex-row">
                                <img id="protected" src="../assets/logotypes/protected.png">
                                <p>Total: <span id="spn-payment-bank-slip-detail">R$ ${total.toFixed(2)}</span></p>
                            </div>

                            <p>Compensação em até 2 dias úteis</p>
                        </div>

                        <div>
                            <button type="submit" id="continue-buying" class="continue-buying cursor-pointer">Continuar comprando</button>
                            <button type="submit" id="finish" class="cursor-pointer btn">Finalizar a compra</button>
                        </div>
                    </div>
                </div>
            </div>`;

        return content;
    }

    static getComponentEmptyCart() {
        return `
            <span class="spn-empty-cart">O carrinho está vazio! Volte a tela inicial e adicione um produto.</span>
            <button type="submit" id="continue-buying" class="cursor-pointer btn">Continuar comprando</button>`;
    }
}