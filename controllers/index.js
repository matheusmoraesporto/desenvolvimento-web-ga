let header = document.getElementsByTagName('header')[0],
    contentHeader =
        `<img src="../assets/JMGames_White.png" alt="JM Games" class="item-header">

        <input type="text" name="search" id="search" placeholder="Pesquisar">

        <div class="usario">
            <img src="../assets/JMGames_White.png" alt="Usuário" class="item-header">
            <span>Olá, usuário!!</span>
        </div>

        <img src="../assets/JMGames_White.png" alt="Carrinho" class="item-header">`;

Utils.pushComponent(header, contentHeader);