---

# Dev Environment Setup

This project is built with [Jekyll 2.4.0](http://jekyllrb.com) - a static site generator. It also uses [Grunt.js](http://gruntjs.com) - a JavaScript task runner and [Bower](http://bower.io) for package management. Admittedly, it's quite painful to get everything working initally, but it's **_well worth it_** for the time you'll save later on.

####On Mac:

Note: You may need to install Ruby, Ruby Gems, NodeJS & Git. There are detailed instructions on the [Jekyll](http://jekyllrb.com/docs/installation/) website. In future builds I'll have Jekyll packaged as a node module so there will be no need to install. Currently, Jekyll is coming through via a SHELL command (kinda sucks).

    gem install jekyll
    git clone git@github.com:liquidvisual/swc-0914.git
    cd swc-0914
    npm install
    bower install
    grunt serve
    # => Now browse to http://localhost:9292

For production:

    grunt build # => to concat and minify etc

####On Windows:

Check this [link](http://jekyllrb.com/docs/windows/#installation). Future builds will use a Yeoman generator, so Windows friendliness is coming! Stay tuned.

---

### Eek! This is Way Too Technical - What Is All This Crap?

True! But stay with me. Jekyll is a Ruby based static site generator (blah blah), and arguably the most popular. Being able to leverage template logic and inheritance is just awesome. It allows me to abstract out or stub data to more closely emulate the back-end. This means less work for the dev who's porting code over. All of the template logic has been done for you! Just follow the comments and hints.

### Resist the Urge to Cut Up the build HTML

Use it as a [reference](https://github.com/liquidvisual/vssa-1614/tree/master/build) if things get hairy, but please don't rely on it! Once you get the hang of reading Jekyll templates - you'll be able to copy/paste everything and substitute the basic templating syntax for your own. It's so much easier.

# Quick Start

The first thing you'll want to do if using Sublime Text is grab the Jekyll extension via [package control](https://sublime.wbond.net). This is important, and **you'll thank me later**. This will ensure all templates will have **appropriate syntax highlighting** - you'll be able to read through them faster and comments will be more obvious.

## Copy Over /assets Directory

Jump into the [build folder](https://github.com/liquidvisual/vssa-1614/tree/master/build) and grab the *entire* /assets folder. Put it into your project's root directory. This contains all the compiled CSS, fonts, images and JavaScript. Also grab the favicon.ico.

That's all you'll need from the build directory. From this point on, all the action is in the /src.

## Access /_layouts/master.html

Start with this and substitute the template logic for your own. When it comes to the assets, they compile into /assets on build so you'll only need to do a bit of substitution.

You can replace this:

    <!-- build:css /assets/css/optimized.css -->
    <link rel="stylesheet" href="/vendor/animate.css/animate.min.css">
    <link rel="stylesheet" href="/css/mmenu/jquery-mmenu.css">
    <link rel="stylesheet" href="/css/foundation/foundation.css">
    <link rel="stylesheet" href="/css/foundation-icons.css">
    <link rel="stylesheet" href="/css/icomoon-icons.css">
    <link rel="stylesheet" href="/css/liquidvisual/liquidvisual.css">
    <link rel="stylesheet" href="/css/main.css">
    <!-- endbuild -->

With this:

    <link rel="stylesheet" href="/assets/css/optimized.css">

The same applies to the Javascript. That's probably the trickiest bit that's not so obvious.

## Copy Over Partials in /_includes

Templates reference partials from this folder.

## Where Data Comes From

### /_data

Some templates and includes will draw data (such as the navigation and locations listing) from YAML files located inside **/_data/**. This keeps things external and templates are able to use basic loops and conditionals to interact with it, similiar to the logic in the back-end.

### /pages

Each Jekyll page is kickstarted with a single MARKDOWN file acting as the 'seed'. These files contain meta data, unique permalink and page specific variables which get passed into the layouts. They also contain body text which is stored as:

    {{ content }}

This is similiar to renderBody(). Think of anything inside /pages as being content which a user can control.

### Front Matter

Every template and markdown file (except the master.html) contains front matter in the form of Yaml at the head of the document. This is used to specify layouts and page variables. Some data is stubbed inside the actual template - for quick access.

As a general rule of thumb; if variables are in the front-matter, they're page variables and user editable. If they're inside the actual layout - they're specific to the individual layout.

# Updating Compiled Assets

## The Quick Way

Simply create a new stylesheet or Javascript and link to it in master. These files can store quick fixes and time sensitive updates. At a later time, they can be absorbed into the Sass files and recompiled with a **grunt build**.

In future, when updates are made - one only needs to copy over the /assets folder from the repo.