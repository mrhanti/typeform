require.config({
  paths: {
    jquery: '../vendor/jquery/jquery',
    bootstrap: '../vendor/bootstrap/bootstrap',
    cs: 'cs',
    CoffeeScript: 'coffee-script'
  },
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  }
});

require(['cs!app', 'bootstrap'], function (App, $) {
  'use strict';
  var el = document.querySelector("ul"),
    viewport = el.parentNode;

  if(typeof el !== 'undefined' && typeof viewport !== 'undefined') {
    var app = new App(el, viewport);
  } else {
    throw new Error("no element of type HtmlUlElement found!!");
  }
});
