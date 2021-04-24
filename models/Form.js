class Form {
    constructor(personalData, addressData) {
        let { email, name, cpf, birthdate, cell, telephone } = personalData;
        let { cep, complement, address, num, reference, state, city } = addressData;

        this.personal = {
            email,
            name,
            cpf,
            birthdate,
            cell,
            telephone
        };

        this.address = {
            cep,
            complement,
            address,
            num,
            reference,
            state,
            city
        };
    }
}