let main = document.getElementsByClassName('main')[0];
let content = '';
let itens = ['controle', 'console'];
itens.forEach(i => {
    content += `<p>${i}</p>`
});
Utils.pushComponent(main, content);