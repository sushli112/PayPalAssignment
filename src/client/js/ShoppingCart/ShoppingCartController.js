import {getItemsForCart, startCheckoutProcess} from "./ShoppingCartService"
const Handlebars = require("handlebars")

export const loadShoppingCart = () => {
  getItemsForCart().then(itemdata => {
    createCartView(itemdata)
  })
}

const createCartView = itemdata => {
  console.log("inside createCartView method..")

  console.log(itemdata)

  var itemTemplate = document.getElementById("itemTemplate").innerHTML
  var compiledItemTemplate = Handlebars.compile(itemTemplate)
  var generatedItemHtml = compiledItemTemplate(itemdata)

  var itemContainer = document.getElementById("ShoppingCart")
  itemContainer.innerHTML = generatedItemHtml

  document.getElementById("checkout").addEventListener("click", function() {
    // var itemName = document.getElementById("itemName").innerText
    // var itemNumber = document.getElementById("itemNumber").innerText
    // var price = document.getElementById("price").innerText

    startCheckoutProcess()
  })
}
