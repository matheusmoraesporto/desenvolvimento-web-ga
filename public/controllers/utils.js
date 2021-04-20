class Utils {
    static pushComponent(element, component) {
        element.innerHTML = component;
    }

    static updateTotalValue(cart) {
        let spnTotal = document.getElementById('spn-total'),
            newTotal = 0;

        cart.forEach(o => newTotal += o.quantity * o.value);

        spnTotal.textContent = `R$ ${parseFloat(newTotal.toFixed(2))}`;
    }
}