class ProductCart {
    constructor(obj, quantidade) {
        let { branch, description, id, img, type, value } = obj;
        this.branch = branch;
        this.description = description;
        this.id = id;
        this.img = img;
        this.type = type;
        this.value = value;
        this.quantidade = quantidade;
    }
}
