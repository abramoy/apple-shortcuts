// URL https://rathgar.nkdpizza.ie/basket_items/new/create_your_own?page=cyo

function selectPizza() {
    selectSize();
    selectCrust();
    selectToppings();
    addToCart();
    
}

function selectSize() {
    document.querySelector("input[value=large]").click();
}

function selectCrust() {
    document.querySelector("input[value=skinny]").click();
}

function selectToppings() {
    document.querySelector("input[value=pepperoni_Q1]").click();
    document.querySelector("input[value=roast_chicken_Q1]").click();
    document.querySelector("input[value=mixed_peppers_Q1]").click();
    document.querySelector("input[value=red_onion_Q1]").click();
}

function addToCart(){
    document.getElementsByClassName("cyo__add-button")[0].click();
}

// Order Pizza
function orderPizza() {
    viewCart();
    selectOrder();
}

function viewCart() {
    document.getElementById("basket-off-canvas").click();
}

function selectOrder() {
    document.getElementsByClassName("basket__button-link")[0].click();
}

function login() {
    document.querySelector("input[name=login]").value = "";
    document.querySelector("input[name=password]").value = "";
    document.getElementsByClassName("form-buttons__button")[0].click();
}

function delivery() {
    document.getElementsByClassName("form-buttons__button")[0].click();
}

function payment() {
    document.getElementsByClassName("form-buttons__button")[0].click();
}



completion();
