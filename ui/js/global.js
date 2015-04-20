//= require jquery.js
//= require modernizr.js
//= require bootstrap.js
//
//  # Slideout for menu
//= require slideout.min.js
//
//  # BigFoot for footnotes
//= require bigfoot.js

var slideout; 

$(function() {
    // Enable footnotes
    $.bigfoot({
        actionOriginalFN: "ignore",
        useFootnoteOnlyOnce: false
    });
    // Enable the slideout menu
    slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 256,
        'tolerance': 70
    });
    // Set the menu div to visible now
    setTimeout(function(){
        $("#menu").removeClass("hidden");
    }, 1000);
    $('nav.hamburger').click(function(){
        slideout.toggle();
    });
    // Set up the smooth scrool for the intros
    $('a.smooth').smoothScroll({
        speed: 1000,
    });
});
