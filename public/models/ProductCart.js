class ProductCart {
    constructor(obj, quantidade) {
        let { branch, description, id, img, type, value, productCode } = obj;
        this.branch = branch;
        this.description = description;
        this.id = id;
        this.img = img;
        this.type = type;
        this.value = value;
        this.productCode = productCode;
        this.quantidade = quantidade;
    }
}
