/* App JS */
// Libraries concatenated & compressed by by jekyll-assets pipeline
//= require jquery.js
//= require modernizr.js
//= require bootstrap.js
// require jquery.easings.min.js
// require jquery.slimscroll.js
// require jquery.fullPage.js
//= require underscore.js
//= require backbone.js
//= require backbone.layoutmanager.js
//= require jquery.smooth-scroll.js
//= require TweenMax.js
//= require jquery.scrollmagic.js
// require jquery.scrollmagic.debug.js
//= require jquery.fluidbox.js
// require d3.js


// 
// ===================================================================
// Configuration
// ===================================================================
window.App = {};

Backbone.Layout.configure({
    manage: true,
});

// ===================================================================
// Utilities
// ===================================================================

// ===================================================================
// Models
// ===================================================================

// Countdown timer


// ===================================================================
// Collections
// ===================================================================

App.dataCards = {}; 
App.articles = {}; // Sections
App.articleSlides = {}; // Fullscreen header slides

// ===================================================================
// Views
// ===================================================================

App.articleView = {}; // Articles

App.slideView = Backbone.View.extend({ // Article header slides
    events: {
        'click a.smooth':  "smoothMofo",
    },
    initialize: function (options) {
        var id = options.id;
        this.$el = $(id); 
        $('a').smoothScroll({
            speed: 1000,
        });
    },
    smoothMofo: function(e) {
        console.log( e );
    }
});

App.cardView = {}; // Data cards


// ===================================================================
// Layouts
// ===================================================================

App.Layout = new Backbone.Layout({
    // Attach the Layout to the main container.
    el: "body",
    views: {
        "fallingGrades": new App.slideView({id: '#falling-grades'}),
        "airAndWater": new App.slideView({id: '#air-and-water'}),
    },
    afterRender: function() {
    }
});

// ===================================================================
// Router
// ===================================================================

App.Router = Backbone.Router.extend({
    initialize: function() { 
    },
    routes: {
        '': 'start',
        '*default': 'defaultRoute'
    },
    start: function() {
        console.log('started');
    },
    defaultRoute: function() {
        console.log("404");
    }
});

// Start the app
App.router = new App.Router();
Backbone.history.start();


// Move this into Layout?
var duration = $(".parallax").height() + $(window).height();
var bgPosMovement = "0 " + (duration*0.8) + "px";
// init controller
var controller = new ScrollMagic({globalSceneOptions: {triggerHook: "onEnter", duration: duration}});
// build scenes
new ScrollScene({triggerElement: ".parallax"})
.setTween(TweenMax.to(".parallax", 1, {backgroundPosition: bgPosMovement, ease: Linear.easeNone}))
.addTo(controller);
