let header = document.getElementsByTagName('header')[0],
    contentHeader =
    `<img src="../assets/logotypes/JMGames_White.png" alt="JM Games" class="logo">

        <input type="text" name="search" id="search" placeholder="Pesquisar">
        
        <div class="user flex-row">
            <img src="../assets/icons/user.png" alt="Usuário" class="item-header">
            <p>Olá, usuário!!</p>
        </div>
        
        <button class="cart cursor-pointer">
            <img src="../assets/icons/cart.png" alt="Carrinho" class="item-header">
        </button>`;

Utils.pushComponent(header, contentHeader);

let footer = document.getElementsByTagName('footer')[0],
    contentFooter =
    `<p>Desenvolvido por: <span>Jennifer Diehl e Matheus Moraes</span></p> 
    <p><p/>
    <p><p/>
    <p>© 2021 JM Games</p>
    `;
Utils.pushComponent(footer, contentFooter);


let main = document.getElementsByClassName('main')[0];
let content = '';
let itens = ['controle', 'console'];
itens.forEach(i => {
    content += `<p>${i}</p>`
});
Utils.pushComponent(main, content);