
Work in progress toward a simple, flexible, and easy to use static news app template for The Tyee & Tyee Solutions Society projects.

# Install requirements

This is still a work in progress, but currently I'm trying to keep it pretty simple:
* Jekyll 2.0.3 (and dependencies)

Jekyll plugins
* [jeyll-assets](https://github.com/ixti/jekyll-assets)

There's extra stuff in here for local development with Grunt, which can be ignored for now (the same functionality is included in Jekyll for the most part)

## Installation

1. Get the source / sub-modules

`git clone https://github.com/TheTyee/static-app-template`

`git submodule init && git submodule update`

2. Install the JavaScript dependencies

`bower install`

3. Install the Ruby dependencies

If you don't have a global install of [Bundler](http://bundler.io/), you'll want to install that first:

`gem update && gem install bundler`

Then install the project requirements in local directory so that you know you're using the right ones:

`bundle install --path _vendor`

## Bundler, Jekyll & development modes

If you run Jekyll though Bundler the project can the gems installed in the `_vendor` directory:

`bundle exec jekyll serve -w --config _config.yml`

That helps to ensure the project is using the right version of each gem, and that it's easily deployed. If you need to add more Ruby dependencies, add them to the `gemfile` and then run `bundle install --path _vendor`.

Configuration files can be added to switch modes:

`bundle exec jekyll serve -w --config _config.yml,_config.development.yml`

`bundle exec jekyll serve -w --config _config.yml,_config.development_w_grunt.yml`

The [Jekyll Assets Pipeline](http://ixti.net/jekyll-assets/) automatically compiles Less to CSS and concatentates JavaScript files. This is pretty much all that is required for development and it's fairly fast. The asset pipeline also handles minification, compression, and cache-busting on CSS, JS, and images on deployment.

## Development with Jekyll & Grunt

It's also possible to run the development set-up through Grunt. The `Gruntfile.js` has sensible defaults for developing that auto-compiles, lints, and beautifies JavaScript and Less, as well as BrowserSync for multi-screen testing, and Live Reload for template changes.

It works nicely, but it's not fast.

## General concepts

To come.
