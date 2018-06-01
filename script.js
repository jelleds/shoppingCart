//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Javascript code


var shoppingCart = {};
shoppingCart.cart = [];

shoppingCart.Item = function (name, price, count) {
    this.name = name
    this.price = price
    this.count = count
}

//Add Item
shoppingCart.addItemToCart = function (name, price, count) {

    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count += count;
            this.saveCart();
            return;
        }
    }
    var item = new this.Item(name, price, count);
    this.cart.push(item);
    this.saveCart();
}

//remove item
shoppingCart.removeItemInCart = function (name, count) {

    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count -= count;
            if (this.cart[i].count === 0) {
                this.removeAllItemsInCart(name);
            }
            break;
        }
    }
    this.saveCart();
}

//remove all items
shoppingCart.removeItemInCartAll = function (name) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart.splice(i, 1);
            break;
        }
    }
    this.saveCart();
}

//clear the whole cart
shoppingCart.clearCart = function () {
    this.cart = [];
    this.saveCart();
}

//count all items in cart
shoppingCart.countCart = function () {

    var totalCount = 0;

    for (var i in this.cart) {
        totalCount += this.cart[i].count;
    }
    return totalCount;
}

//count total cost of the cart
shoppingCart.totalCart = function () {

    var totalCost = 0;
    for (var i in this.cart) {
        totalCost += this.cart[i].price * this.cart[i].count;
    }

    return totalCost.toFixed(2);
}

//make a copy of the cart
shoppingCart.listCart = function () {
    var cartCopy = [];
    for (var i in this.cart) {
        var item = this.cart[i];
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
shoppingCart.saveCart = function () {
    localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
}

//load the cart from the local storage of the browser
shoppingCart.loadCart = function () {
    this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

shoppingCart.setCountForItem = function (name, count) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count = count;
            break;
        }
    }
    this.saveCart();
}


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//JQuery code to print the code on the screen


//adding an item to the list
$(".add-to-cart").click(function (event) {
    event.preventDefault();
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));

    shoppingCart.addItemToCart(name, price, 1);
    displayCart();

});

//clear cart button
$("#clear-cart").click(function (event) {
    shoppingCart.clearCart();
    displayCart();

});

//remove item buttton
$("#show-cart").on("click", "#remove-item", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.removeItemInCartAll(name);
    displayCart();
});

//minus button
$("#show-cart").on("click", "#min", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.removeItemInCart(name, 1);
    displayCart();
});

$("show-cart").on("change", ".item-count", function (event) {
    var name = $(this).attr("data-name");
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

//plus button
$("#show-cart").on("click", "#plus", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.addItemToCart(name, 0, 1);
    displayCart();
});

//display the cart on the page
function displayCart() {

    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<li>" + cartArray[i].name + "<input class='item-count' type='number' data-name='" + cartArray[i].name + "'value='" + cartArray[i].count + "' >" + " * " + cartArray[i].price + " = " + cartArray[i].total + " " + "<button id='min' data-name='" + cartArray[i].name + "'>-</button>" + "<button id='plus' data-name='" + cartArray[i].name + "'>+</button>" + "<button id='remove-item' data-name='" + cartArray[i].name + "'>Remove item</button></li>";
    }
    $("#show-cart").html(output);
    $("#count-cart").html(shoppingCart.countCart());
    $("#total-cart").html(shoppingCart.totalCart());

}

shoppingCart.loadCart();

displayCart();