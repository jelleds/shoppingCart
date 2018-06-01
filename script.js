//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Javascript code

var cart = [];

var Item = function (name, price, count) {
    this.name = name
    this.price = price
    this.count = count
};

//Add Item
function addItemToCart(name, price, count) {

    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count += count;
            saveCart();
            return;
        }
    }
    var item = new Item(name, price, count);
    cart.push(item);

}

//Remove Item
function removeItemInCart(name, count) {

    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count -= count;
            if (cart[i].count === 0) {
                removeAllItemsInCart(name);
            }
            break;
        }
    }
    saveCart();
}

//remove all items
function removeItemInCartAll(name) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart.splice(i, 1);
            break;
        }
    }
    saveCart();
}

//clear the whole cart
function clearCart() {
    cart = [];
    saveCart();
}

//count all items in cart
function countCart() {

    var totalCount = 0;

    for (var i in cart) {
        totalCount += cart[i].count;
    }
    return totalCount;
}

//count total cost of the cart
function totalCart() {

    var totalCost = 0;
    for (var i in cart) {
        totalCost += cart[i].price * cart[i].count;
    }

    return totalCost.toFixed(2);
}

//make a copy of the cart
function listCart() {
    var cartCopy = [];
    for (var i in cart) {
        var item = cart[i];
        var itemCopy = {};
        for (var j in item) {
            itemCopy[j] = item[j];
        }
        itemCopy.total = (item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
    }
    return cartCopy;
}

//save the cart to the local storage of the browser
function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

//load the cart from the local storage of the browser
function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
}




//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//JQuery code to print the code on the screen


//adding an item to the list
$(".add-to-cart").click(function (event) {
    event.preventDefault();
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));

    addItemToCart(name, price, 1);
    displayCart();

});

//clear cart button
$("#clear-cart").click(function (event) {
    clearCart();
    displayCart();

});

//remove item buttton
$("#show-cart").on("click", "#remove-item", function (event) {
    var name = $(this).attr("data-name");
    removeItemInCartAll(name);
    displayCart();
});

//minus button
$("#show-cart").on("click", "#min", function (event) {
    var name = $(this).attr("data-name");
    removeItemInCart(name, 1);
    displayCart();
});

//plus button
$("#show-cart").on("click", "#plus", function (event) {
    var name = $(this).attr("data-name");
    addItemToCart(name, 0, 1);
    displayCart();
});

//display the cart on the page
function displayCart() {

    var cartArray = listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<li>" + cartArray[i].name + " " + cartArray[i].count + " * " + cartArray[i].price + " = " + cartArray[i].total + " " + "<button id='min' data-name='" + cartArray[i].name + "'>-</button>" + "<button id='plus' data-name='" + cartArray[i].name + "'>+</button>" + "<button id='remove-item' data-name='" + cartArray[i].name + "'>Remove item</button></li>";
    }
    $("#show-cart").html(output);
    $("#total-cart").html(totalCart());

}


loadCart();

displayCart();