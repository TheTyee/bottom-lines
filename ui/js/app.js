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
//  
//  # Smooth scroll for intro jumps
//= require jquery.smooth-scroll.js
//= require jquery.fluidbox.min.js
//= require jquery.scrollstop.js
//
//  # Slideout for menu
//= require slideout.min.js
//  
//  # Scroll Magic for parallax
//= require TweenMax.js
//= require jquery.scrollmagic.js
// require jquery.scrollmagic.debug.js
//  # D3 for cards
//= require d3.js
//  # BigFoot for footnotes
//= require bigfoot.js
//
//  # Thes should be loaded by the cards, not app.js
//= require app-timeseries.js
//= require app-regions.js

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

App.cards   = new Backbone.Collection();
App.chapters = new Backbone.Collection();

// ===================================================================
// Views
// ===================================================================

App.HamburgerNavView = Backbone.View.extend({
    el: 'nav.hamburger',
    $el: $('nav.hamburger'),
    initialize: function(options){
    },
    events: {
        "click .button": "toggle",
    },
    beforeRender: function() {

    },
    afterRender: function() {

    },
    toggle: function(event) {
        App.slideout.toggle();
    }
});
// Create a modal view class
App.CardView = Backbone.View.extend({
    initialize: function(options){
        var id = options.id;
        this.$el = $('#' + id);
        this.modelId = id;
    },
    events: {
        "click .btn-next": "next",
        "click .btn-prev": "prev",
        "click .btn-close": "close",
        "click .close": "close",
        "keydown" : "control"
    },
    beforeRender: function() {

    },
    afterRender: function() {

    },
    show: function(card){
        var model = App.cards.get(this.modelId);
        if ( model.get('css') && model.get('css-loaded') !== true ) {
            var css = model.get('css');
            $('<link>')
            .appendTo('head')
            .attr({type : 'text/css', rel : 'stylesheet'})
            .attr('href', css);
            model.set("css-loaded", true);
        }
        if ( model.get('js') && model.get('js-loaded') !== true ) {
            var js = model.get('js');
            $.ajax({
                url: js,
                dataType: "script",
                success: function(){ model.set("js-loaded", true); }
            });
        }
        // If there's a draw function for this card, run it
        // If there is already an active modal
        // then toggle which modal is active
        // TODO switch this to use models not 
        // And this should probably happen with a listen event on the model
        var activeModal = $('.modal:visible');
        if ( activeModal.length > 0 ) {
            activeModal.modal('hide');
            this.$el.modal('show');
        } else { 
            // Trigger the modal
            this.$el.modal('show');
        }
    },
    next: function(event) {
        App.CardsLayout.showNext(event);
    },
    prev: function(event) {
        App.CardsLayout.showPrev(event);
    },
    close: function(event){
        App.CardsLayout.close(event);
    },
    control: function(event) {
        switch (event.keyCode) {
            case 37:
                this.prev(event);
                break;
            case 39:
                this.next(event);
                break;
        }
    }
});


App.ArticleView = Backbone.View.extend({ 
    visible: 'false',
    card: '',
    events: {
        "click .link-card": "showCard"
    },
    initialize: function (options) {
        var id = options.id;
        var visibility = options.visible;
        var card = options.card;
        this.el = id;
        this.$el = $(id); 
        this.visible = visibility;
        this.card    = card;
    },
    afterRender: function() {
        // Handle cards experiement
        if ( this.card ) {
            console.log("showing a modal");
        }
    },
    show: function() {
        this.$el.show();
        this.visible = true;
        // Animate the article header
        $(".intro").delay(1500).animate({ opacity: 1}, 700);
        // If we're using figures
        $(this.el + " figure a").fluidbox();
        $(this.el + " aside a").fluidbox();
        // Handle cards
        if ( this.card ) {
            App.CardsLayout.startShow( this.card );
        }
        var parallax = this.$('.parallax');
        if (parallax.length >= 1) { 
            var duration = parallax.height() + $(window).height();
            var bgPosMovement = "0 " + (duration*1.1) + "px";
            // init controller
            var controller = new ScrollMagic({globalSceneOptions: {triggerHook: "onEnter", duration: duration}});
            // build scenes
            new ScrollScene({triggerElement: parallax })
            .setTween(TweenMax.to(parallax, 1, {backgroundPosition: bgPosMovement, ease: Linear.easeNone}))
            .addTo(controller);
        }
    },
    addCard: function(card) {
        this.card = card;
    },
    showCard: function(event) {
        event.preventDefault();
        var el = event.currentTarget;
        var cardId = $(el).data('card');
        App.CardsLayout.startShow(cardId);
    },
    hide: function() {
        this.$el.hide();
        this.visible = false;
        $(".intro").css({ opacity: 0});
    }
}); // Articles

// ===================================================================
// Layouts
// ===================================================================

App.CardsLayout = new Backbone.Layout({
    collection: App.cards,
    el: '#modals',
    views: {},
    initialize: function() {},
    afterRender: function() {
    },
    beforeRender: function() {
        this.collection.each(function(model) {
            this.insertView(new App.CardView({ "id": model.get('id') }));
        }, this);
    },
    startShow: function(cardId) {
        var self = this;
        // This is a terrible hack for an async
        // issue that I don't have time to solve right now
        var check = function() { 
            var card = self.getView({"id": cardId });
            if ( card ) {
                card.show();
                // TODO This is silly, fix it!
                var currentPath = Backbone.history.fragment;
                var base = currentPath.split('/')[0];
                var item = currentPath.split('/')[1];
                App.router.navigate(base + '/' + item + '/' + cardId, { trigger: false } );
            } else {
                setTimeout(check, 1000);
            }
        };
        check();
    },
    showNext: function(event){
        var el = event.currentTarget;
        var cardId = $(el).data('next');
        this.startShow(cardId);
        // TODO This is silly, fix it!
        var currentPath = Backbone.history.fragment;
        var base = currentPath.split('/')[0];
        var item = currentPath.split('/')[1];
        App.router.navigate(base + '/' + item + '/' + cardId, { trigger: false } );
    },
    showPrev: function(event) {
        var el = event.currentTarget;
        var cardId = $(el).data('prev');
        this.startShow(cardId);
        // TODO This is silly, fix it!
        var currentPath = Backbone.history.fragment;
        var base = currentPath.split('/')[0];
        var item = currentPath.split('/')[1];
        App.router.navigate(base + '/' + item + '/' + cardId, { trigger: false } );

    },
    close: function (event) {
        // TODO This is silly, fix it!
        var currentPath = Backbone.history.fragment;
        var base = currentPath.split('/')[0];
        var item = currentPath.split('/')[1];
        App.router.navigate(base + '/' + item, { trigger: false } );
    }
});

App.Layout = new Backbone.Layout({
    // Attach the Layout to the main container.
    el: "body",
    views: {
        "intro": new App.ArticleView({id: '#intro', visible: true }), // Start with Chapter One
        "last-in-class": new App.ArticleView({id: '#last-in-class' }), // Start with Chapter One
        "air-and-water": new App.ArticleView({id: '#air-and-water'}),
        "species": new App.ArticleView({id: '#species'}),
        "climate": new App.ArticleView({id: '#climate'}),
        "environment": new App.ArticleView({id: '#environment'}),
        "about": new App.ArticleView({id: '#about'}),
        //"chart-timeseries": new App.CardView({id: '#chart-timeseries', type: 'timeseries'}),
        //"chart-region": new App.CardView({id: '#chart-region', type: 'region' })
        "nav.hamburger": new App.HamburgerNavView()
    },
    initialize: function () {
        var self = this;
    },
    afterRender: function() {
        // Set up the smooth scrool for the intros
        $('a.smooth').smoothScroll({
            speed: 1000,
        });
        // If we want to hide the hamburger nav on scroll.
        // Doesn't work nicely on mobile, however...
        //$(window).on("scrollstart", function() {
            //$('nav.hamburger').css({display: "none"});
            //}).on("scrollstop", function() {
        //$('nav.hamburger').css({display: "block"});
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
        'chapter/:name/:card' : 'displayChapterWithCard',
        'card(/:name)': 'displayCard',
        '*default': 'defaultRoute'
    },
    start: function() {
        console.log('Routing started');
        this.navigate("chapter/intro", {trigger: true});
    },
    // TODO Remove the duplication from these two routes:
    displayChapter: function(name) {
        console.log('Showing chapter: ' + name);
        var currentView = App.Layout.getView({ visible: true });
        var nextView = App.Layout.getView(name);
        if ( nextView ) {
            if ( App.slideout.isOpen() === true ) {
                App.slideout.close();
            }
            currentView.hide();            
            nextView.show();
            window.scrollTo(0, 0); // Yuck!
        } else {
            console.log('No matching chapter');
        }
    },
    displayChapterWithCard: function(name, card) {
        console.log('Showing chapter: ' + name + ' with card ' + card );
        var currentView = App.Layout.getView({ visible: true });
        var nextView = App.Layout.getView(name);
        if ( nextView ) {
            if ( App.slideout.isOpen() === true ) {
                App.slideout.close();
            }
            currentView.hide();
            nextView.addCard(card);            
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
        // Find all the modals in the page
        var modals = $('.modal');
        // Add them to a collection for easy management
        _.each(modals, function(modal) {
            console.log(modal.id);
            App.cards.add({
                "id": modal.id,
                "group": $(modal).data('group'),
                "js": $(modal).data('js'),
                "css": $(modal).data('css')
            });
        });
        // Enable footnotes
        $.bigfoot({
            actionOriginalFN: "ignore",
            useFootnoteOnlyOnce: false
        });
        // Enable the slideout menu
        App.slideout = new Slideout({
            'panel': document.getElementById('panel'),
            'menu': document.getElementById('menu'),
            'padding': 256,
            'tolerance': 70
        });
        // Render the cards layout
        App.CardsLayout.render();
        // Start the app
        App.router = new App.Router();
        Backbone.history.start();
        // Set the menu div to visible now
        setTimeout(function(){
            $("#menu").show();
        }, 1000);
    });
