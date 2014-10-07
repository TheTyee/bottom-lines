/* App JS */
// Libraries concatenated & compressed by by jekyll-assets pipeline
//= require jquery.js
//= require modernizr.js
//= require bootstrap.js
//= require jquery.easings.min.js
//= require jquery.slimscroll.js
//= require jquery.fullPage.js
//= require underscore.js
//= require backbone.js
//= require backbone.layoutmanager.js
//= require jquery.smooth-scroll.js
//= require jquery.fluidbox.min.js
//= require jquery.scrollstop.js
//= require TweenMax.js
//= require jquery.scrollmagic.js
// require jquery.scrollmagic.debug.js
//= require d3.js
//= require app-timeseries.js


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

// ===================================================================
// Collections
// ===================================================================

// ===================================================================
// Views
// ===================================================================

App.ArticleView = Backbone.View.extend({ 
    visible: 'false',
    events: {
    },
    initialize: function (options) {
        var id = options.id;
        var visibility = options.visible;
        this.el = id;
        this.$el = $(id); 
        this.visible = visibility;
    },
    afterRender: function() {
    },
    show: function() {
        this.$el.show();
        this.visible = true;
        $(".intro").delay(1500).animate({ opacity: 1}, 700);
        $(this.el + " figure a").fluidbox();
        var parallax = this.$('.parallax');
        if (parallax.length >= 1) { 
            var duration = parallax.height() + $(window).height();
            var bgPosMovement = "0 " + (duration*0.8) + "px";
            // init controller
            var controller = new ScrollMagic({globalSceneOptions: {triggerHook: "onEnter", duration: duration}});
            // build scenes
            new ScrollScene({triggerElement: parallax })
            .setTween(TweenMax.to(parallax, 1, {backgroundPosition: bgPosMovement, ease: Linear.easeNone}))
            .addTo(controller);
        }
    },
    hide: function() {
        this.$el.hide();
        this.visible = false;
        $(".intro").css({ opacity: 0});
    }
}); // Articles

App.CardView = Backbone.View.extend({
    visible: false,
    events: {
        "click button.close": function() { Backbone.history.history.back(); }
    },
    initialize: function (options) {
        var id = options.id;
        var visibility = options.visible;
        this.el = id;
        this.$el = $(id); 
        this.visible = visibility;
    },
    show: function() {
        this.$el.show();
        this.visible = true;
        // Find the window dimensions
        margins = {top: 10, right: 80, bottom: 60, left: 60};
        width = parseInt(d3.select("#datavis").style("width"));
        height = parseInt(d3.select("#datavis").style("height"));

        // Setup container & chart dimensions
        container_dimensions = {width: width, height: height},
        chart_dimensions = {
            width: container_dimensions.width - margins.left - margins.right,
            height: container_dimensions.height - margins.top - margins.bottom
        };
        if (!chart) { // Temporary fix to prevent redraw, but need re-animate
            // Setup SVG
            chart = d3.select("#datavis")
            .append("svg")
            .attr("width", container_dimensions.width)
            .attr("height", container_dimensions.height)
            .append("g")
            .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
            .attr("id","chart");

            d3.csv("/data/data.csv", function(d) {
                return {
                    year: new Date(+d.Year, 0, 1), // convert "Year" column to Date
                    ghgs: +d.GHGs,
                    pop: +d.Population,
                    kyoto: +d.Kyoto
                };
            }, draw );
        }
    },
    hide: function() {
        this.$el.hide();
    }
}); // Data cards



// ===================================================================
// Layouts
// ===================================================================

App.Layout = new Backbone.Layout({
    // Attach the Layout to the main container.
    el: "body",
    views: {
        "last-in-class": new App.ArticleView({id: '#last-in-class', visible: true }), // Start with Chapter One
        "air-and-water": new App.ArticleView({id: '#air-and-water'}),
        "chart-timeseries": new App.CardView({id: '#chart-timeseries'})
    },
    initialize: function () {
        var self = this;
    },
    afterRender: function() {
        $('a.smooth').smoothScroll({
            speed: 1000,
        });
        // If we want to hide the nav on scroll.
        //$(window).on("scrollstart", function() {
        //$('header.site-header').css({display: "none"});
        //})
        //.on("scrollstop", function() {
        //// Paint it all green when scrolling stops.
        //$('header.site-header').css({display: "block"});
        //});
    }
});

// ===================================================================
// Router
// ===================================================================

App.Router = Backbone.Router.extend({
    initialize: function() { 
        App.Layout.render();
    },
    routes: {
        '': 'start',
        'chapter(/:name)': 'displayChapter',
        'card(/:name)': 'displayCard',
        '*default': 'defaultRoute'
    },
    start: function() {
        console.log('Routing started');
        this.navigate("chapter/last-in-class", {trigger: true});
    },
    displayChapter: function(name) {
        console.log('Showing chapter: ' + name);
        var currentView = App.Layout.getView({ visible: true });
        var nextView = App.Layout.getView(name);
        if ( nextView ) {
            currentView.hide();
            nextView.show();
            window.scrollTo(0, 0); // Yuck!
        } else {
            console.log('No matching chapter');
        }
    },
    displayCard: function(name) {
        console.log('Showing card: ' + name);
        var currentView = App.Layout.getView({ visible: true });
        var nextView = App.Layout.getView(name);
        if ( nextView ) {
            currentView.hide();
            nextView.show();
            //window.scrollTo(0, 0); // Yuck!
        } else {
            console.log('No matching card');
        }
    },
    defaultRoute: function() {
        console.log("404");
    }
});

$(function() {
    // Start the app
    App.router = new App.Router();
    Backbone.history.start();
});
