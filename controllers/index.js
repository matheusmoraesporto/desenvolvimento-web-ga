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