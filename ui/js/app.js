/* App JS */
// # Libraries concatenated & compressed by by jekyll-assets pipeline
//= require underscore.js
//= require backbone.js
//= require backbone.layoutmanager.js
//  
// # Smooth scroll for intro jumps
//= require jquery.smooth-scroll.js
//= require jquery.fluidbox.min.js
//= require jquery.scrollstop.js
//
//  
// # Scroll Magic for parallax
//= require TweenMax.js
//= require jquery.scrollmagic.js
// require jquery.scrollmagic.debug.js
//  # D3 for cards
//= require d3.js
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

App.updateMeta = function(model) {
    var title = model.get('title');
    var desc  = model.get('dek');
    var image = model.get('image');
    var path  = model.get('path');
    var url =  domain + path;
    if ( title && desc && image && url ) {
        $('title').remove();
        $('meta[property="og:title"]').remove();
        $('meta[property="DC.title"]').remove();
        $('meta[property="description"]').remove();
        $('meta[property="DC.description"]').remove();
        $('meta[property="og:description"]').remove();
        $('meta[property="og:image"]').remove();
        $('meta[property="og:image:url"]').remove();
        $('meta[property="og:url"]').remove();
        $("head").append('<title>' + title + '</title>');
        $("head").append('<meta property="og:title" content="' + title + '">');
        $("head").append('<meta property="og:description" content="' + desc + '">');
        $("head").append('<meta property="description" content="' + desc + '">');
        $("head").append('<meta property="og:image" content="' + domain + image + '">');
        $("head").append('<meta property="og:image:url" content="' + domain + image + '">');
        $("head").append('<meta property="og:url" content="' + url + '">');
    }
};

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

App.NavView = Backbone.View.extend({
    initialize: function(options){
        var dom = options.dom;
        this.$el = $(dom);
    },
    events: {
        "click .nav-item": "navigate"
    },
    navigate: function(e) {
        e.preventDefault();
        var el = e.currentTarget;
        var navTo = $(el).data('nav');
        App.router.navigate(navTo, { trigger: true });
    }
});

App.navTop = new App.NavView({ "dom": "#top-nav" });
App.navSide = new App.NavView({ "dom": "#menu" });
App.navFooter = new App.NavView({ "dom": "nav.chapter-next" });

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
        //TODO first update the _cards with the data attributes
        //     then use this to update the meta for the route
        //     App.updateMeta(model);
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
                success: function(){ 
                    model.set("js-loaded", true);
                    // If there's a function for this card, run it w/ args
                    if ( model.get('function') ) {
                        var args = model.get('arguments').split(', ');
                        argsObject = {};
                        if( typeof args === 'object') {
                           _.each(args, function(arg) {
                              var c = arg.split(':');
                              argsObject[c[0]] = c[1];
                           });
                        }
                        window[model.get('function')](argsObject);
                    }
                }
            });
        }
        // If there is already an active modal
        // then toggle which modal is active
        // TODO switch this to use models
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
        this.modelId = id;
        this.el = '#' + id;
        this.$el = $(this.el); 
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
        // TODO re-work the modal-finding stuff
        var activeModal = $('.modal:visible');
        if ( activeModal.length > 0 ) {
            activeModal.modal('hide');
        }
        this.$el.show();
        this.visible = true;
        // Animate the article header
        $(".intro").delay(1500).animate({ opacity: 1}, 700);
        // If we're using figures
        $(this.el + " figure.fluidbox a").fluidbox();
        $(this.el + " aside.fluidbox a").fluidbox();
        // Set up the smooth scrool for the intros
        $('a.smooth').smoothScroll({
            speed: 1000,
        });
        // Handle cards
        if ( this.card ) {
            App.CardsLayout.startShow( this.card );
        } else {
            // Not showing a card, so let's update the meta info for sharing
            // TODO move all of this to a utility so it can be used by cards too
            var model = App.chapters.get({ "id": this.modelId });
            App.updateMeta(model);
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
        if ( cardId ) {
            this.startShow(cardId);
            // TODO This is silly, fix it!
            var currentPath = Backbone.history.fragment;
            var base = currentPath.split('/')[0];
            var item = currentPath.split('/')[1];
            App.router.navigate(base + '/' + item + '/' + cardId, { trigger: false } );
        }
    },
    showPrev: function(event) {
        var el = event.currentTarget;
        var cardId = $(el).data('prev');
        if ( cardId ) {
            this.startShow(cardId);
            // TODO This is silly, fix it!
            var currentPath = Backbone.history.fragment;
            var base = currentPath.split('/')[0];
            var item = currentPath.split('/')[1];
            App.router.navigate(base + '/' + item + '/' + cardId, { trigger: false } );
        }
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
    collection: App.chapters,
    el: "body",
    beforeRender: function() {
        // Automatically add any chapter models as sub-views
        this.collection.each(function(model) {
            this.insertView(model.get('id'), new App.ArticleView({ "id": model.get('id') }));
        }, this);
        var intro = App.Layout.getView({"id": "intro"});
        intro.visible = true;
    },
    views: {
    },
    initialize: function () {
        var self = this;
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
