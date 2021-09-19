    // form
    
    function contactForm(){
    var name=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var message=document.getElementById('message').value;

    if (name !== "" && email !== "" && message !== ""){
        alert(name+ ' we have received your message. Thank you for reaching out to us.');
    } else if(name !== "" || email !== "" || message !== ""){
        alert('Fill everything, please.')
    }
};

$(document).ready(function () {

    $(".main").click(function () {
        $(this).children("#design-p").slideToggle(2000);
        $(this).children("#design").toggle(2000);
    });

});


// business logic
function Pizza(size, crust, topping) {
    this.sizeValue = size;
    this.crustCost = crust;
    this.toppingCost = topping;
}

Pizza.prototype.myOrder = function () {
    result = this.sizeValue + this.crustCost + this.toppingCost;
    return result;

}


//User Interface 

$(document).ready(function () {
    let formForOrder = document.querySelector('#formForOrder');
    let orderCheck = document.querySelector("#orderCheck");
    let tot = document.querySelector("#total");
    let cart = [];
    formForOrder.addEventListener("submit", function (event) {
        event.preventDefault();
        $(this).closest('form').find("input[type=text], textarea").val("");
        let size = $("#size").val();
        let crust = $("#crust").val();
        let topping = $("#topping").val();
        let toppingCost = 0;
        let crustCost = 0;
        let sizeValue = 0;
        if (size.length === 0 || crust.length === 0 || topping.length === 0) {
            alert("Select from all the fields before adding to cart!!! ")
            throw new Error;
        }
        if (crust == "Crispy") {
            crustCost = crustCost + 250;
        } else if (crust == "Stuffed") {
            crustCost = crustCost + 300;
        } else if (crust == "Gluten-free") {
            crustCost = crustCost + 350;
        }

        if (topping == "Mushroom") {
            toppingCost = toppingCost + 100;
        } else if (topping == "Sausage") {
            toppingCost = toppingCost + 150;
        } else if (topping == "Green Pepper") {
            toppingCost = toppingCost + 200;
        }

        if (size == "Small") {
            sizeValue += 200;
        } else if (size == "Medium") {
            sizeValue += 250;
        } else if (size == "Large") {
            sizeValue += 300;
        }
        let newOrder = new Pizza(sizeValue, crustCost, toppingCost);
        let fd = new FormData(formForOrder);
        let order = {}

        for (let key of fd.keys()) {
            if (fd.get(key).toString().length > 0) {
                order[key] = fd.get(key).toString();
            }
        }

        order.toppingCost = toppingCost;
        order.crustCost = crustCost;
        order.sizeValue = sizeValue;
        order["total"] = (order["toppingCost"] + order["crustCost"] + order["sizeValue"]);
        cart.push(order);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Your selection have been successfully added to cart.")
        $(".viewYourOrder").show();
        $("#guide").show();
        let form1 = document.getElementsByName("formForOrder")[0];
        form1.reset();
    });


    orderCheck.addEventListener('click', function () {
        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart.length > 0) {
            document.querySelector("#order").innerHTML = "";
            cart.forEach(element => {
                document.querySelector("#order").innerHTML += `<tr>
          <td>${element['size']}</td>
          <td>${element['crust']}</td>
          <td>${element['topping']}</td>
          <td>${(element['toppingCost']) + (element['crustCost']) + (element['sizeValue'])}</td>
          </tr>`;
            });
        }

        //print order summary to a table

        $("#tableForOrder").show();
        $("#location").show();
        const total = cart.reduce((sum, item) => sum + (parseInt(item['total'])), 0);
        const deliveryCost = 0.2 * total;
        tot.innerHTML = "Aggregate Order Price Ksh " + total.toString();

        //Confirmation for delivery option

        $("form#data").submit(function (event) {
            event.preventDefault();
            let delivery = $("#askForLocation").val();

            if (delivery === "Yes") {
                $("#message").text("Your shipping cost is Ksh " + deliveryCost);
                $("#data").show();
                $("#locateUser").show();
                $("#Info").hide();
                $(this).hide();
                $("#location").hide();
            } else if (delivery == "No") {
                $("#Info").show();
                $("#locateUser").hide();
                $(this).hide();
                $("#location").hide();
            }
        })

        //capture details from user with no delivery

        $("#detailsButton").click(function (event) {
            event.preventDefault();
            let userName = $("input#nameOne").val();
            let phone = $("input#phone1").val();
            if (userName.length === 0 || phone.length === 0) {
                alert("Enter all fields before submitting!!!")
            } else {
                $("#checkoutUser1").show();
                $(this).hide();
                $("#Info").hide();
            }

            //show order summary on checkout without delivery

            $("#checkout1").click(function (event) {
                event.preventDefault();
                $("#priceOne").text(total);
                $("#usser").text(userName);
                $("#userPhoneOne").text(phone);
                $("#popupOne").show();
                $(this).hide();
            })
        })

        //Receive inputs from customer with delivery

        $("#deliveryButton").click(function (event) {
            event.preventDefault();
            const deliveryLocation = $("input#deliveryLocation").val();
            let userName = $("input#name").val();
            let phone = $("input#phone").val();

            if (deliveryLocation.length === 0 || userName.length === 0 || phone.length === 0) {
                alert("Enter all fields before submitting!!!")
            } else {
                $("#message2").text("Your shipping location is " + deliveryLocation + ". This order will be delivered to your location after you checkout.");
                $("#alert").show();
                $("#checkOut").show();
                $("#locateUser").hide();
                $(this).hide();
            }

            //Display order summary on checkout with delivery

            $("#checkoutButton").click(function (event) {
                event.preventDefault();
                let totalOrderCost = total + deliveryCost;
                $("#nameTwo").text(userName);
                $("#userPhoneTwo").text(phone);
                $("#price").text(total);
                $("#shippingLocation").text(deliveryLocation);
                $("#deliveryCost").text(deliveryCost);
                $("#totalSum").text(totalOrderCost);
                $("#checkoutAlert").show();
                $(this).hide();
            })
        })
    });

});