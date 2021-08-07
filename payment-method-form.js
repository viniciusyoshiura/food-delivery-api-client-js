
function getPaymentMethods() {
	$.ajax({
	  url: "http://127.0.0.1:8080/payment-methods",
	  type: "get",

	  success: function(response) {
		setTable(response);
	  }
	});
}

function setTable(paymentMethods) {
  $("#table tbody tr").remove();

  $.each(paymentMethods, function(i, paymentMethod) {
    var row = $("<tr>");

    var actionLink = $("<a href='#'>")
      .text("Remove")
      .click(function(event) {
        event.preventDefault();
        removePaymentMethod(paymentMethod);
      });

    row.append(
      $("<td>").text(paymentMethod.id),
      $("<td>").text(paymentMethod.description),
      $("<td>").append(actionLink)
    );

    row.appendTo("#table");
  });
}

function registerPaymentMethod() {
  var paymentMethodJSON = JSON.stringify({
    "description": $("#field-description").val()
  });

  console.log(paymentMethodJSON);

  $.ajax({
    url: "http://127.0.0.1:8080/payment-methods",
    type: "post",
    data: paymentMethodJSON,
    contentType: "application/json",

    success: function(response) {
      alert("Payment method was registered!");
      getPaymentMethods();
    },

    error: function(error) {
      if (error.status == 400) {
        var problem = JSON.parse(error.responseText);
        alert(problem.userMessage);
      } else {
        alert("An error ocurred when registering payment method!");
      }
    }
  });
}

function removePaymentMethod(paymentMethod) {
  var url = "http://127.0.0.1:8080/payment-methods/" + paymentMethod.id;

  $.ajax({
    url: url,
    type: "delete",

    success: function(response) {
      getPaymentMethods();

      alert("Payment method was removed!");
    },

    error: function(error) {
      if (error.status >= 400 && error.status <= 499) {
        var problem = JSON.parse(error.responseText);
        alert(problem.userMessage);
      } else {
        alert("An error ocurred when removing payment method!");
      }
    }
  });
}

$("#btn-search").click(getPaymentMethods);
$("#btn-register").click(registerPaymentMethod);