let products = document.getElementsByClassName('products')[0];
let content = '';


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
readTextFile("./data/produtos.json", function(text){
    let items = JSON.parse(text);//.slice(0, 3);
    
    items.forEach(i => {
        content += `
        <div>
            <img src="${i.img}" alt="Carrinho" class="cursor-pointer">
            <p>${i.description}</p>
        </div>
        `;
    });

    Utils.pushComponent(products, content);
});

