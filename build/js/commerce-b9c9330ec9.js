!function t(n,o,e){function c(a,i){if(!o[a]){if(!n[a]){var s="function"==typeof require&&require;if(!i&&s)return s(a,!0);if(r)return r(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=o[a]={exports:{}};n[a][0].call(u.exports,function(t){var o=n[a][1][t];return c(o?o:t)},u,u.exports,t,n,o,e)}return o[a].exports}for(var r="function"==typeof require&&require,a=0;a<e.length;a++)c(e[a]);return c}({1:[function(t,n,o){"use strict";$(document).ready(function(){function t(){testStore.Cart.retrieve(function(t){console.log(t),t.total_items>=1&&$("#cart").empty().append('<span class="glyphicon glyphicon-shopping-cart"></span> '+t.subtotal.formatted_with_symbol)},function(t){console.log(t)})}function n(t){testStore.Cart.add({id:t,quantity:1},function(t){console.log(t),$("#cart").empty().append('<span class="glyphicon glyphicon-shopping-cart"></span> '+t.cart.subtotal.formatted_with_symbol)})}function o(){testStore.Cart.empty(function(t){console.log(t.cart.subtotal.formatted_with_symbol),$("#cart").empty()})}function e(){console.log("This is the checkout page..."),testStore.Cart.retrieve(function(t){testStore.Checkout.generateToken(t.id,"cart",function(t){console.log(t)},function(t){console.log(t)})})}testStore.Products.list(function(c){$("#loading").hide(),t(),$.each(c.data,function(t,o){var e='<div class="col-md-4"><div id="'+o.id+'" class="panel panel-default"><div class="panel-body">';e+='<h3 class"product_name">'+o.name+"</h3>",e+='<p class"product_description">'+o.description+"</p>",e+='<button id="add_cart_'+o.id+'" class="btn btn-default">Add to Cart</button><button class="btn btn-default">More Information</button>',e+="</div></div></div>",$("#products").append(e).fadeIn(),$("#add_cart_"+o.id).click(function(){n(o.id)})}),$("#clear_cart").append('<button id="clear_cart_btn" class="btn btn-default">Clear Cart</button>'),$("#clear_cart_btn").click(function(){o()}),$("#checkout").length&&e()},function(t){console.log(t)})})},{}]},{},[1]);