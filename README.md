
Work in progress toward a simple, flexible, and easy to use static news app template for The Tyee & Tyee Solutions Society projects.

# Install requirements

This is still a work in progress, but currently I'm trying to keep it pretty simple:
* Jekyll 2.4.0 (and dependencies)

Jekyll plugins
* [jeyll-assets](https://github.com/ixti/jekyll-assets)

There's extra stuff in here for local development with Grunt, which can be ignored for now (the same functionality is included in Jekyll for the most part)

## Installation

1. Get the source / sub-modules

`git clone https://github.com/TheTyee/static-app-template`

`git submodule init && git submodule update`

2. Install the JavaScript dependencies

If you don't have [NPM](https://www.npmjs.org/) installed, you'll need to do that first by installing [Node.js](http://nodejs.org/). Just download and install the package that's available for your operating system [from the Node website](http://nodejs.org/).

Then, to install [Bower, the JavaScript package manager](http://bower.io/), run:

`npm install bower -g`

Then, to install the project's JavaScript dependencies, run:

`bower install`

You should see output relating to [Backbone](http://backbonejs.org/) and so on.

3. Install the Ruby dependencies

If you're running a relatively recent version of OSX or Linux, you should already have a working version of Ruby. If you don't, have a look at [rbenv](https://github.com/sstephenson/rbenv) and the associated ruby-build project.

From there, if you don't have a global install of [Bundler](http://bundler.io/), you'll want to install that:

`gem update && gem install bundler`

Then install the project requirements into a local directory so that you know you're using the right ones:

`bundle install --path _vendor`

## Bundler, Jekyll & development modes

If you run Jekyll though Bundler the project and the gems installed will be in hte the `_vendor` directory, which means you can run the project with the following command:

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
