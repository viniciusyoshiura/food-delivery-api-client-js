function getRestaurants() {
  $.ajax({
    url: "http://127.0.0.1:8080/restaurants",
    type: "get",

    success: function(response) {
      $("#json").text(JSON.stringify(response, null, 2));
	  console.log(JSON.stringify(response, null, 2));
    }
  });
}

function closeRestaurant() {
  $.ajax({
    url: "http://127.0.0.1:8080/restaurants/1/closure",
    type: "put",

    success: function(response) {
      alert("Restaurant was closed!");
    }
  });
}

$("#btn-search").click(getRestaurants);
$("#btn-close").click(closeRestaurant);