$(document).ready(function(){

    $(".main").click(function(){
        $(this).children("#design-p").slideToggle(2000);
        $(this).children("#design").toggle(2000);
    });

    // form

    $(".form").submit(function(){
        var name = document.getElementById("mce-NAME").value
        var email = document.getElementById("mce-EMAIL").value
        var message = document.getElementById("mce-MESSAGE").value
        if (name == "" || name == null){
            alert("Name can not be empty")
        }
        else if (email == "" || email == null){
            alert("Email can not be empty")
        }

        else if (message == "" || message == null){
            alert("message can not be empty")
        }
       else{
        alert (" We have received your message " + name + ". Thank you for reaching out to us")
       }
        

    })
    
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
    let orderForm = document.querySelector('#orderForm');
    let checkOrder = document.querySelector("#checkOrder");
    let tot = document.querySelector("#total");
    let cart = [];
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();
      $(this).closest('form').find("input[type=text], textarea").val("");
      let size = $("#size").val();
      let crust = $("#crust").val();
      let topping = $("#topping").val();
      let toppingCost = 0;
      let crustCost = 0;
      let sizeValue =0;
      if (size.length === 0 || crust.length === 0 || topping.length === 0 ) {
        alert("Select from all the fiels before adding to cart!!! ")
        throw new Error;
      }
      if (crust == "Crispy") {
        crustCost = crustCost + 250;
      } 
      else if (crust == "Stuffed") {
        crustCost = crustCost + 300;
      } 
      else if (crust == "Gluten-free") {
        crustCost = crustCost + 350;
      }
  
      if (topping == "Mushroom") {
        toppingCost = toppingCost + 100;
      } 
      else if (topping == "Sausage") {
        toppingCost = toppingCost + 150;
      } 
      else if (topping == "Green Pepper") {
        toppingCost = toppingCost + 200;
      }
  
      if (size == "Small") {
        sizeValue += 200;
      } 
      else if (size == "Medium") {
        sizeValue += 250;
      } 
      else if (size == "Large") {
        sizeValue += 300;
      }
      let newOrder = new Pizza(sizeValue, crustCost, toppingCost);
      let fd = new FormData(orderForm);
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
      alert("Your selection have been successfuly added to cart.")
      $(".view-order").show();
      $("#guide").show();
      let form1 =document.getElementsByName("orderForm")[0];
      form1.reset();
    });

});