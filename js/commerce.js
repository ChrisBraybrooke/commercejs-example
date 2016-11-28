(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {
	testStore.Products.list(function (resp) {
		$("#loading").hide();

		//Initiate the cart
		newCart();

		// Foreach Product
		$.each(resp.data, function (k, product) {

			// Open Product Card
			var product_card_html = '<div class="col-md-4"><div id="' + product.id + '" class="panel panel-default"><div class="panel-body">';

			// Product Name
			product_card_html += '<h3 class"product_name">' + product.name + '</h3>';

			// Product Description
			product_card_html += '<p class"product_description">' + product.description + '</p>';

			// Add buttons
			product_card_html += '<button id="add_cart_' + product.id + '" class="btn btn-default">Add to Cart</button><button class="btn btn-default">More Information</button>';

			// Close Product Card
			product_card_html += '</div></div></div>';

			$('#products').append(product_card_html).fadeIn();

			$("#add_cart_" + product.id).click(function () {
				addToCart(product.id);
			});
		});

		$("#clear_cart").append('<button id="clear_cart_btn" class="btn btn-default">Clear Cart</button>');

		$("#clear_cart_btn").click(function () {
			clearCart();
		});

		if ($('#checkout').length) {
			Checkout();
		}
	}, function (error) {
		console.log(error);
	});

	function newCart() {

		testStore.Cart.retrieve(function (resp) {
			console.log(resp);
			if (resp.total_items >= 1) {
				$('#cart').empty().append('<span class="glyphicon glyphicon-shopping-cart"></span> ' + resp.subtotal.formatted_with_symbol);
			}
		}, function (error) {
			console.log(error);
		});
	}

	function addToCart(product_id) {

		testStore.Cart.add({
			'id': product_id,
			'quantity': 1
		}, function (resp) {
			console.log(resp);
			$("#cart").empty().append('<span class="glyphicon glyphicon-shopping-cart"></span> ' + resp.cart.subtotal.formatted_with_symbol);
		});
	}

	function clearCart() {

		testStore.Cart.empty(function (resp) {
			console.log(resp.cart.subtotal.formatted_with_symbol);
			$("#cart").empty();
		});
	}

	function Checkout() {

		console.log('This is the checkout page...');

		testStore.Cart.retrieve(function (resp) {

			testStore.Checkout.generateToken(resp.id, 'cart', function (resp) {

				console.log(resp);
			}, function (error) {

				console.log(error);
			});
		});
	}

	function getLiveCheckout(checkout_id) {
		testStore.Checkout.getLive(checkout_id, function (resp) {
			console.log(resp);
		}, function (error) {
			console.log(error);
		});
	}
});

},{}]},{},[1]);

//# sourceMappingURL=commerce.js.map
