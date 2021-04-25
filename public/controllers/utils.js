class Utils {
    static pushComponent(element, component) {
        element.innerHTML = component;
    }

    static updateTotalValue(cart) {
        let spnTotal = document.getElementById('spn-total'),
            spnPayment = document.getElementById('spn-payment-bank-slip-detail'),
            newTotal = 0;

        cart.forEach(o => newTotal += o.quantity * o.value);

        let newTotalToFixed = parseFloat(newTotal.toFixed(2));

        spnTotal.textContent = `R$ ${newTotalToFixed}`;

        spnPayment.textContent = `R$ ${newTotalToFixed}`;

        return newTotal;
    }
}