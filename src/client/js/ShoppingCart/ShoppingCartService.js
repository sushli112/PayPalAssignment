export const getItemsForCart = function(event) {
  console.log("inside getItemsForCart method")
  const url = "http://localhost:8082/items"
  const response = fetch(url)
    .then(resp => resp.json())
    .then(data => {
      console.log(`items size from Server:${data.itemList}`)
      return data
    })
    .catch(error => {
      console.log(error)
    })
  return response.then(value => value)
}

export const startCheckoutProcess = cartInfo => {
  console.log("inside startCheckoutprocess method")
  var settings = {
    url: "/checkout",
    type: "POST",
    mode: "no-cors",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
    data: JSON.stringify(cartInfo),
  }

  $.ajax(settings).done(function(response) {
    console.log(response)
  })
}
