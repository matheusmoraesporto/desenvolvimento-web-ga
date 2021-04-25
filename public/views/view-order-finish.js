class ViewOrderFinish {
    static getOrderFinish(cart) {
        let fakeBoleto = '';

        for (let index = 0; index < 48; index++) {
            fakeBoleto += Math.floor(Math.random() * 10);
        }

        return `
            <div class="card-conclusion">
                <div class="product-resume">
                    <div class="resume">
                        <h3>Resumo do pedido</h3>
                        <p>Número do pedido: <span>${parseInt(Math.random() * 100000)}</span></p>
                        <p>Valor do pedido:<span>R$ ${Utils.updateTotalValue(cart)}</span></p>
                        
                        <div>
                            <input id="input-boleto" type="text" readonly value="${fakeBoleto}">
                            <button id="btn-copy" class="btn">Copiar o código de barras do boleto<button>
                        </div>
                    </div>
                    <div class="conclusion">
                        <h3>Pedido conlcluído com sucesso!</h3>
                        <img src="../assets/Icons/ok.png" alt="Sucesso" class="">
                    </div>
                </div>
                
                <div class="payment">
                    <p>O boleto de cobrança foi enviado para o seu e-mail.</p>
                    <button type="submit" id="back" class="cursor-pointer btn">Voltar ao início <img src="../assets/Icons/log-out.png" alt="Voltar" class=""></button>
                </div>
            </div>`;
    }
}