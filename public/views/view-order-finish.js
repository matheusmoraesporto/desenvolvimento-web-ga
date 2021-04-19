class ViewOrderFinish {
    static getOrderFinish() {
        return `
            <div class="card-conclusion">
                <div class="product-resume">
                    <div class="resume">
                        <h3>Resumo do pedido</h3>
                        <p>Número do pedido: <span>${parseInt(Math.random() * 100000)}</span></p>
                        <p>Valor do pedido:<span>R$ ESTÁ FIXO NEGÃO</span></p>
                    </div>
                    <div class="conclusion">
                        <h3>Pedido conlcluído com sucesso!</h3>
                        <img src="../assets/Icons/ok.png" alt="Sucesso" class="">
                    </div>
                </div>
                
                <div class="payment">
                    <p>O boleto de cobrança foi enviado para o seu e-mail.</p>
                    <button type="submit" id="back" class="cursor-pointer">Voltar ao início <img src="../assets/Icons/log-out.png" alt="Voltar" class=""></button>
                </div>
            </div>`;
    }
}