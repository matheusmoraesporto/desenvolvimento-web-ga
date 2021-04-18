class ViewOrderFinish {
    static getOrderFinish() {
        return `
            <div>
                <div class="flex-row">
                    <div>
                        <h3>Resumo do pedido</h3>
                        <p>Número do pedido: <span>${parseInt(Math.random() * 100000)}</span></p>
                        <p>Valor do pedido: <span>R$ESTÁ FIXO NEGÃO</span></p>
                    </div>
                    <div>
                        <h3>Pedido conlcluído com sucesso!</h3>
                        <img src="../assets/Icons/ok.png" alt="Sucesso" class="">
                    </div>
                </div>
                
                <div class="flex-row">
                    <p>O boleto de cobrança foi enviado para o seu e-mail.</p>
                    <button type="submit" id="back" class="cursor-pointer">Voltar ao início <img src="../assets/Icons/log-out.svg" alt="Voltar" class=""></button>
                </div>
            </div>`;
    }
}