vssa-1614
========

[UAT Link Here](http://vacswimsa.uat.liquidvisual.net)

### Installation

This project is built with [Jekyll 2.4.0](http://jekyllrb.com) - a static site generator. It also uses [Grunt.js](http://gruntjs.com) - a JavaScript task runner and [Bower](http://bower.io) for package management.

On Mac:

Note: You may need to install Ruby, Ruby Gems, NodeJS & Git. There are detailed instructions on the [Jekyll](http://jekyllrb.com/docs/installation/) website.

    gem install jekyll
    git clone git@github.com:liquidvisual/swc-0914.git
    cd swc-0914
    npm install
    bower install
    grunt serve
    # => Now browse to http://localhost:9292

For distribution:

    grunt build # => to concat and minify etc

For Windows check this [link](http://jekyllrb.com/docs/windows/#installation).